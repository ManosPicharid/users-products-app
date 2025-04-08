// First Example

// import winston from "winston";

// const logger = winston.createLogger(
//     {
//         format: winston.format.json(),
//         transports: [
//             new winston.transports.Console()
//           ]
//         }
// )

// Second Example

// import { format, createLogger, transports } from "winston";

// const logger = createLogger({
//   format: format.combine(
//     format.label({ label: "Products app logs" }),
//     format.timestamp(),
//     format.printf(({ timestamp, label, message }) => {
//       return `${timestamp} [${label}]: ${message}`;
//     })
//   ),
//   transports: [new transports.Console()]
// });

// Third Example
import { format, createLogger, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { MongoDB } from "winston-mongodb";

const { combine, timestamp, label, prettyPrint } = format;
const CATEGORY = "Products app logs"
const fileRotateTransport = new transports.DailyRotateFile({
  filename: "./logs/rotate-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "7d",
  level: "error"
})

const logger = createLogger({
  format: combine(
    label({ label: CATEGORY }),
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    format.json()
    // prettyPrint()
  ),
  transports: [
    new transports.Console(),
    fileRotateTransport,
    new transports.File(
      {
        filename: "logs/example.log"
      }
    ),
    new transports.File(
      {
        level: "warn",
        filename: "logs/warn.log"
      }
    ),
    new transports.File(
      {
        level: "info",
        filename: "logs/info.log"
      }
    ),
    new transports.MongoDB({
      level: "warn",
      db: process.env.MONGODB_URI,
      collection: "server_logs",
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
})

export { logger }