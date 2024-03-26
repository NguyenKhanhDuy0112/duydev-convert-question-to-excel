pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    IMAGE_NAME = 'reactjs-18-rtk-query'
    IMAGE_TAG = 'latest'
    APP_NAME = 'jenkins-example-react'
  }
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}