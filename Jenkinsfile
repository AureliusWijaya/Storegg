pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Start Building the app'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running the test'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying the app'
                echo "Build ID: ${BUILD_ID}"
                echo "Build Url: ${BUILD_URL}"
            }
        }
    }
}
