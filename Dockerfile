FROM node:lts

# install npm dependencies
WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install

# copy the code
# (after dependencies installation)
COPY . /app

# Cloning zotero translators repository
RUN git clone https://github.com/zotero/translators.git /app/modules/translators/
RUN git clone https://github.com/zotero/translate.git /app/modules/translate/
# run the application
EXPOSE 1969
ENTRYPOINT [ "./docker-entrypoint.sh" ]
