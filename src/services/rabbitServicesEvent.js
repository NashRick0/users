import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_HOST;
const RABBIT_EXCHANGE = "user_event";
const RABBIT_ROUTING_KEY = "user.created";

export async function sendUserCreatedEvent(user) {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    //Declaramos el exchange
    await channel.assertExchange(RABBIT_EXCHANGE, 'topic', { durable: true });

    //Publicamos el evento
    const message = JSON.stringify(user);
    channel.publish(RABBIT_EXCHANGE, RABBIT_ROUTING_KEY, Buffer.from(message));

    console.log(`exchange "${RABBIT_EXCHANGE}", routingKey "${RABBIT_ROUTING_KEY}": message "${message}"`);

    setTimeout(() => {
        connection.close();
    }, 500);

}