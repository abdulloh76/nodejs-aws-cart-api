package main

import (
	"log"
	"os"

	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/v2/awslambda"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
	"github.com/joho/godotenv"
)

type CartServiceStackProps struct {
	awscdk.StackProps
	dbHost     string
	dbPort     string
	dbUsername string
	dbPassword string
	dbName     string
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
		Handler:      jsii.String("main.lambda.handler"),
		Environment: &map[string]*string{
			"DB_HOST":     jsii.String(props.dbHost),
			"DB_PORT":     jsii.String(props.dbPort),
			"DB_USERNAME": jsii.String(props.dbUsername),
			"DB_PASSWORD": jsii.String(props.dbPassword),
			"DB_NAME":     jsii.String(props.dbName),
		},
	})

	// * apigateway instance
	awsapigateway.NewLambdaRestApi(stack, jsii.String("Cart-Service-Rest-Api"), &awsapigateway.LambdaRestApiProps{
		DeployOptions: &awsapigateway.StageOptions{StageName: jsii.String("dev")},
		Handler:       cartServiceHandler,
		Proxy:         jsii.Bool(true),
	})

	return stack
}

func main() {
	// Load environment variables from .env file
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	defer jsii.Close()

	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUsername := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	app := awscdk.NewApp(nil)

	NewCartServiceStack(app, "CartServiceStack", &CartServiceStackProps{
		dbHost:     dbHost,
		dbPort:     dbPort,
		dbUsername: dbUsername,
		dbPassword: dbPassword,
		dbName:     dbName,
	})

	app.Synth(nil)
}
