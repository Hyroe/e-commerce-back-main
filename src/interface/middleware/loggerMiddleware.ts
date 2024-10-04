import { createLogger, transports, format } from "winston";
import util from "util";

const { combine, timestamp, printf, colorize, align, errors } = format;

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    errors({ stack: true }),
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => {
      const { timestamp, level, message, ...meta } = info;
      const filteredMeta = Object.keys(meta).reduce(
        (acc: Record<string, unknown>, key) => {
          if (typeof key !== "symbol") {
            acc[key] = meta[key];
          }
          return acc;
        },
        {} as Record<string, unknown>
      );
      const metaString = Object.keys(filteredMeta).length
        ? `\n${util.inspect(filteredMeta, { depth: null, colors: true })}`
        : "";
      return `[${timestamp}] ${level}: ${message}${metaString}`;
    })
  ),
  transports: [new transports.Console()],
  exceptionHandlers: [new transports.Console()],
  rejectionHandlers: [new transports.Console()],
});

export { logger };
