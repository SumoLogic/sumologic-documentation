<!-- Required steps to access test env -->

# Local Typesense Search Setup

## Prerequisites

- Homebrew
- Docker
- Yarn

## Setup Steps

### 1. Install Typesense

```bash
brew install typesense
brew services start typesense
```

### 2. Verify it's running

```bash
curl http://localhost:8108/health
```

Should return `{"ok":true}`

### 3. Install Docker (needed for the scraper)

```bash
brew install --cask docker
```

Then open Docker from Applications to start it.

### 4. Build and serve the docs locally

```bash
yarn build
yarn serve
```

### 5. In a new terminal, create the scraper config

```bash
cat > /tmp/docsearch-config.json << 'EOF'
{
  "index_name": "sumo-docs",
  "start_urls": ["http://host.docker.internal:3000/"],
  "selectors": {
    "lvl0": "article h1",
    "lvl1": "article h2",
    "lvl2": "article h3",
    "lvl3": "article h4",
    "text": "article p, article li"
  }
}
EOF
```

### 6. Run the scraper

```bash
cd /tmp
docker run -it --rm \
  -e TYPESENSE_API_KEY=xyz \
  -e TYPESENSE_HOST=host.docker.internal \
  -e TYPESENSE_PORT=8108 \
  -e TYPESENSE_PROTOCOL=http \
  -e CONFIG="$(cat docsearch-config.json)" \
  typesense/docsearch-scraper
```

This takes a while (~140k records).

### 7. Test the search

Open `http://localhost:3000` and try the search box.

---

## Troubleshooting

### Docker install error: "already a Binary at '/usr/local/bin/hub-tool'"

This is a leftover from a previous install. You can ignore it or force reinstall:

```bash
brew reinstall --cask docker --force
```

### Docker not in Applications folder

Try opening it directly:

```bash
open /opt/homebrew/Caskroom/docker-desktop/4.52.0,210994/Docker.app
```

### Scraper returns "Connection refused"

Your local docs server isn't running. Make sure `yarn serve` is running in another terminal before starting the scraper.

### Scraper returns 403 Forbidden

This happens when scraping production (sumologic.com/help) due to bot protection. Always scrape against your local build instead.

### Scraper shows "nbHits 0" or "Ignored: from start url"

The selectors aren't matching the HTML structure. Make sure you're using the config above, which is tuned for our Docusaurus setup.

### Typesense not running

Check status with:

```bash
brew services list | grep typesense
```

If stopped, start it:

```bash
brew services start typesense
```

### Find your Typesense API key

```bash
cat /opt/homebrew/etc/typesense/typesense.ini
```
