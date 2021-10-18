### AITA

### Project describe
service have:<br/>
1. MongoDB db to store mocked users: ID, name, km distance, hours.
2. API to generate boarding pass image for user (ID is required)<br/>
Response have name and unique invite code and svg Image Code;
3. API to check if invitation is valid (invite code is required). <br/>
Return JSON with user name and ID.
4. Service have 2 web urls:
    + /map -> show statistics about each arrived user and <br/>
update presentation every 10 seconds. There are just name, distance and hours;
    + /boarding -> show last arrived user’s statistics in realtime<br/>
when check validity API is called. Just name, distance and hours<br/>

### Install dependencies
```bash
npm i
```
### Tests 
```bash
npm test
```
### Start project
```bash
npm run
```
http://localhost:3000/
### Swagger describe api
http://localhost:3000/api-docs/


### Docker
```bash
docker build -t aita . 
docker run -p 3000:3000 -d aita // curl http://localhost:3000 => ok
```

### Load docker image `aita` to kubernates by minikube and kubectl:
------------------------------------------------------
```bash
minikube start
```
to set of Bash environment variable exports to configure your local environment to re-use the Docker daemon inside the Minikube instance.
```bash
& minikube -p minikube docker-env | Invoke-Expression
// minikube docker-env
// minikube -p minikube docker-env
```

to run and expose services:
```bash
kubectl run aita --image=aita --image-pull-policy=Never --port=3000
kubectl expose pod aita --port=3000 --name=aita --type=NodePort
kubectl get svc
```
```bash
NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
aita         NodePort    10.104.122.232   <none>        3000:31442/TCP   17s
kubernetes   ClusterIP   10.96.0.1        <none>        443/TCP          33m
```

I have not extarnal ip, so used
`minikube tunnel`

```bash
minikube tunnel
kubectl create deployment aita --image=aita
kubectl expose deployment aita --type=LoadBalancer --port=3000 --target-port=3000
kubectl get svc
```
```bash
NAME         TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
aita         LoadBalancer   10.111.148.4   127.0.0.1     3000:30493/TCP   5m2s
kubernetes   ClusterIP      10.96.0.1      <none>        443/TCP          25m
```

and have a such like this:
```bash
kubectl cluster-info
```
```bash
Kubernetes control plane is running at https://127.0.0.1:63181
CoreDNS is running at https://127.0.0.1:63181/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```
