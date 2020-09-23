OBJECTS = $(patsubst %.c, %.o, $(wildcard *.c))

run: app
	./app

app: $(OBJECTS)
	gcc $< -o app
