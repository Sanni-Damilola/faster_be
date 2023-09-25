import fs from "fs";
import http, { IncomingMessage, ServerResponse } from "http";
import axios from "axios";
import { RequestBody, ResponseMessage } from "./interface";

const port: number = 2023;

const handleNotFound = (res: ServerResponse<IncomingMessage>) => {
  const status: number = 404;
  const response: ResponseMessage = {
    message: "Not Found",
    success: false,
    data: null,
  };
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status, response }));
};

const handleGetOneGithubUrl = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  reqData: RequestBody
) => {
  try {
    const { username } = reqData;
    if (!username) {
      throw new Error("Username not provided");
    }

    const endPoint = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const status = endPoint.status;
    const userDetails = endPoint.data;

    const response: ResponseMessage = {
      message: `${userDetails?.login} Found`,
      success: true,
      data: userDetails,
    };

    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status, response }));
  } catch (error: any) {
    const status: number = 404;
    const response: ResponseMessage = {
      message: error.message || "Not Found",
      success: false,
      data: null,
    };

    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status, response }));
  }
};

const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    try {
      const { method, url } = req;

      if (method === "POST") {
        if (url === "/getonegithuburl") {
          let reqbody = "";
          req.on("data", (chunk) => {
            reqbody += chunk;
          });
          req.on("end", async () => {
            const reqData: RequestBody = JSON.parse(reqbody);
            await handleGetOneGithubUrl(req, res, reqData);
          });
        } else {
          handleNotFound(res);
        }
      } else {
        handleNotFound(res);
      }
    } catch (error) {
      console.error("Error:", error);
      handleNotFound(res);
    }
  }
);

server.listen(port, () => {
  console.log("Done On Port", port);
});
