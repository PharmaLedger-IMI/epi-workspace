FROM node:12.16.0

RUN npm install -g node-gyp

ENV TARGET_FOLDER_NAME="ePI-workspace"
RUN git clone https://github.com/PharmaLedger-IMI/epi-workspace.git $TARGET_FOLDER_NAME

RUN cd $TARGET_FOLDER_NAME && \
    npm install --unsafe-perm

ADD config/env.json /$TARGET_FOLDER_NAME/env.json
ADD config/web-server /$TARGET_FOLDER_NAME/web-server

RUN cd $TARGET_FOLDER_NAME && \
    echo 'npm run server & \n sleep 3m \n npm run build-all \n tail -f /dev/null' >> startup-script.sh
RUN cd $TARGET_FOLDER_NAME && cat startup-script.sh

EXPOSE 8080/tcp

CMD cd $TARGET_FOLDER_NAME && \
    bash startup-script.sh
