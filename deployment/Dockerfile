FROM mhart/alpine-node:6
ENV APP_PATH=/usr/browse-app

#copy and install package
RUN mkdir ${APP_PATH}
WORKDIR ${APP_PATH}

COPY /build/browse-app.zip ${APP_PATH}
RUN unzip  ${APP_PATH}/browse-app.zip -d ${APP_PATH}

RUN rm -f ${APP_PATH}/browse-app.zip

EXPOSE 8080
CMD [ "npm", "run", "start" ]
