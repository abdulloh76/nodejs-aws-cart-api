package main

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/v2/awslambda"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type CartServiceStackProps struct {
	awscdk.StackProps
}

func NewCartServiceStack(scope constructs.Construct, id string, props *CartServiceStackProps) awscdk.Stack {
	var sprops awscdk.StackProps
	if props != nil {
		sprops = props.StackProps
	}
	stack := awscdk.NewStack(scope, &id, &sprops)

	// * lambda handlers
	cartServiceHandler := awslambda.NewFunction(stack, jsii.String("CartService"), &awslambda.FunctionProps{
		FunctionName: jsii.String("CartService"),
		Code:         awslambda.Code_FromAsset(jsii.String("../dist"), nil),
		Runtime:      awslambda.Runtime_NODEJS_18_X(),
		Handler:      jsii.String("main.handler"),
	})

	// * apigateway instance
	cartApi := awsapigateway.NewRestApi(stack, jsii.String("Cart-Service-Rest-Api"), &awsapigateway.RestApiProps{
		DeployOptions: &awsapigateway.StageOptions{StageName: jsii.String("dev")},
	})

	cartApi.Root().AddProxy(&awsapigateway.ProxyResourceOptions{
		DefaultIntegration: awsapigateway.NewLambdaIntegration(
			cartServiceHandler,
			&awsapigateway.LambdaIntegrationOptions{Proxy: jsii.Bool(true)}),
	})

	return stack
}

func main() {
	defer jsii.Close()

	app := awscdk.NewApp(nil)

	NewCartServiceStack(app, "CartServiceStack", &CartServiceStackProps{})

	app.Synth(nil)
}
