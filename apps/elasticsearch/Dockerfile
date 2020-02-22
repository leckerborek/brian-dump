FROM elasticsearch:7.5.2
ENV discovery.type single-node
RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install --batch ingest-attachment
EXPOSE 9200 9300