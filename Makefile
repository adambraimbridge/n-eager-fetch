clean:
	git clean -fxd

install:
	npm install

test:
	nbt verify --skip-layout-checks
