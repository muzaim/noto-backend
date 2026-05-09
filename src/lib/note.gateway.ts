import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NoteGateway {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('WEBSOCKET READY');
  }

  handleConnection() {
    console.log('CLIENT CONNECTED');
  }

  emitNotesUpdate() {
    console.log('EMIT NOTES UPDATE');

    this.server.emit('notes.updated');
  }
}
