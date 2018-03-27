FROM mhart/alpine-node:6
ENV APP_PATH=/usr/browse-app-two

#copy and install package
RUN mkdir ${APP_PATH}
WORKDIR ${APP_PATH}

COPY /build/browse-app.zip ${APP_PATH}
RUN unzip  ${APP_PATH}/browse-app-two.zip -d ${APP_PATH}

RUN rm -f ${APP_PATH}/browse-app-two.zip

EXPOSE 8082
CMD [ "npm", "run", "start" ]
