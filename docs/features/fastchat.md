# Large Model Systems Organization (LMSYS Org) FastChat Integration
## Description
FastChat is a project from LMSYS provides a compatiable OpenAI API for LLMS.  

## FastChat Repository
https://github.com/lm-sys/FastChat

## Supported Models
https://github.com/lm-sys/FastChat/blob/main/docs/model_support.md

## Integration Instructions
These instructions are for using the vicuna-13b-v1.5-16k model.
### Install FastChat
Clone Git Repostiory
Modify Dockerfile
Replace install fastchat with RUN pip3 install fschat[model_worker,webui]
For my model I also had to add
```
RUN pip3 install protobuf
RUN pip3 install vllm
```

Build the docker container: 
```
docker build ./docker/  -t fastchat:latest
````

Modify docker-compose.yaml
```
 entrypoint: ["python3.9", "-m", "fastchat.serve.vllm_worker", "--model-names", "vicuna-13b-v1.5-16k", "--model-path", "lmsys/vicuna-13b-v1.5-16k", "--worker-address", "http://fastchat-model-worker:21002", "--controller-address", "http://fastchat-controller:21001", "--host", "0.0.0.0", "--port", "21002"]
```


### Configure LibreChat
Edit the LibreChat .env file to set the model for the following variables and point to the IP address of the FastChat server for the proxy
```
OPENAI_API_KEY=EMPTY
OPENAI_MODELS=vicuna-13b-v1.5-16k
PLUGIN_MODELS=vicuna-13b-v1.5-16k
OPENAI_TITLE_MODEL=vicuna-13b-v1.5-16k
OPENAI_REVERSE_PROXY=http://192.168.0.100:8000/v1/chat/completions
```

