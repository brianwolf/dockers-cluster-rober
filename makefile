IMAGE=ghcr.io/brianwolf/dockers-cluster-rober:latest

build b:
	docker build . -t $(IMAGE)

run r: b
	docker run -it --rm -p 8080:80 -v .:/usr/share/nginx/html $(IMAGE)

push p:
	docker push $(IMAGE)