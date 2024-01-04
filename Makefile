# Makefile for deploying to neocities
# Borrowing from https://jonathanchang.org/blog/deploying-your-static-site-to-neocities-using-github-actions/

SOURCE_DIR := ./
TARGET_DIR := ./_site
DATE := $(shell /bin/date)

# Define patterns to exclude from the copy operation
EXCLUDE_PATTERNS := $(addprefix --exclude=, $(shell cat $(SOURCE_DIR)/.gitignore))
EXCLUDE_PATTERNS += --exclude='ex1.html'

site: $(TARGET_DIR)/index.html

$(TARGET_DIR)/index.html: $(SOURCE_DIR)/ex1.html
	mkdir -p $(TARGET_DIR)
	# sed -e "s/__LAST_UPDATED__/$(DATE)/" $< > $@
	# not using date replacement for now
	rsync -av --delete $(EXCLUDE_PATTERNS) $(SOURCE_DIR)/ $(TARGET_DIR)/
	cp $< $@

clean:
	rm -rf $(TARGET_DIR)

.PHONY: site clean
