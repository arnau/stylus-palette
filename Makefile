tag ?= latest
app_image_name ?= arnau/stylus-palette
app_name ?= stylus-palette
app_image = $(app_image_name):$(tag)

images = `docker images -f 'dangling=true'`

build :
	docker build -t $(app_image) .

# Remove container
rm :
	docker rm -f $(app_name)

# Remove orphan images
rmo :
	docker rmi $$(docker images -qf 'dangling=true')

# Remove tagged image
rmi :
	docker rmi $(app_image)

test :
	docker run --rm  \
		--name $(app_name) \
		-v $$(pwd):/usr/src/app \
		$(app_image_name)

absorb :
	git checkout master
	git pull origin master
	git checkout $(branch)
	git rebase master
	git checkout master
	git merge --no-ff $(branch)


.PHONY: build rm rmo rmi test absorb
