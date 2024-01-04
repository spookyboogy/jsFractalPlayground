# Makefile for deploying to neocities
# Borrowing from https://jonathanchang.org/blog/deploying-your-static-site-to-neocities-using-github-actions/

SOURCE_DIR := ./
TARGET_DIR := ./_site
DATE := $(shell /bin/date)

site: $(TARGET_DIR)/index.html

$(TARGET_DIR)/index.html: $(SOURCE_DIR)/ex1.html
	mkdir -p $(TARGET_DIR)
	# sed -e "s/__LAST_UPDATED__/$(DATE)/" $< > $@
	# not using date replacement for now
	cp -r $(SOURCE_DIR)/* $(TARGET_DIR)/
	# Copy additional files or directories as needed

clean:
	rm -rf $(TARGET_DIR)

.PHONY: site clean
