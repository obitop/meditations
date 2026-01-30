import { app } from './api/server.ts';

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Listening on ', PORT);
});
