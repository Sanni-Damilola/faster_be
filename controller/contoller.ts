import { NextFunction, Response, Request } from "express";
import { AsyncHandler } from "../MiddleWare/AsyncHandler";
import { HTTPCODES, MainAppError } from "../Utils/MainAppError";
import UserModels from "../model/adminModel";
import { EnvironmentVariables } from "../config/envV";
import orderModels from "../model/orderModel";
import shipmentModels from "../model/ShipmentHistory";
import mongoose from "mongoose";
import {
  generateRandomNumericString,
  handleErrorResponse,
} from "../Utils/utils";

export const GetAllOrders = AsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const orders = await orderModels.find().populate("ShipmentHistory");
      const ordersLength = orders.length;
      const message =
        ordersLength === 0
          ? "No orders available"
          : "All orders retrieved successfully";
      return res
        .status(HTTPCODES.OK)
        .json({ length: ordersLength, message, data: orders });
    } catch (error) {
      return handleErrorResponse(error, res);
    }
  }
);

export const createAdmin = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkIfExist = await UserModels.findOne({
        email: EnvironmentVariables?.AdminEmail,
      });
      if (checkIfExist) {
        return next(
          new MainAppError({
            message: "Admin Already Exist",
            httpcode: HTTPCODES.BAD_REQUEST,
          })
        );
      }
      await UserModels.create({
        name: EnvironmentVariables?.AdminName,
        email: EnvironmentVariables?.AdminEmail,
        password: EnvironmentVariables?.AdminPassword,
      });

      return res.status(HTTPCODES.OK).json({
        message: "Created",
      });
    } catch (error) {
      return handleErrorResponse(error, res);
    }
  }
);

export const loginAdmin = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const getUser = await UserModels.findOne({ email });

      if (!getUser) {
        return next(
          new MainAppError({
            message: "Invalid credentials. Please try again.",
            httpcode: HTTPCODES.UNAUTHORIZED,
          })
        );
      }

      if (getUser.password !== password) {
        return next(
          new MainAppError({
            message: "Invalid credentials. Please try again.",
            httpcode: HTTPCODES.UNAUTHORIZED,
          })
        );
      }

      return res.status(HTTPCODES.OK).json({
        message: "Login successful",
        data: getUser._id,
      });
    } catch (error: any) {
      return handleErrorResponse(error, res);
    }
  }
);

export const getAdmin = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const admin = await UserModels.findById(id);
    if (!admin) {
      throw new MainAppError({
        message: "Admin not found",
        httpcode: HTTPCODES.NOT_FOUND,
      });
    }

    return res.status(HTTPCODES.OK).json({
      data: admin,
    });
  } catch (error: any) {
    return handleErrorResponse(error, res);
  }
});

export const GetOneOrder = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { trackingId } = req.params;
      const order = await orderModels
        .findOne({ TRACKINGID: trackingId })
        .populate("ShipmentHistory");

      if (!order) {
        return next(
          new MainAppError({
            message: "Order not found",
            httpcode: HTTPCODES.NOT_FOUND,
          })
        );
      }

      return res.status(HTTPCODES.OK).json({ data: order });
    } catch (error: any) {
      return handleErrorResponse(error, res);
    }
  }
);

export const updateAdmin = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, email } = req.body;

    const admin = await UserModels.findById(id);
    if (!admin) {
      throw new MainAppError({
        message: "Admin not found",
        httpcode: HTTPCODES.NOT_FOUND,
      });
    }

    await UserModels.findByIdAndUpdate(admin._id, { name, email, password });

    return res.status(HTTPCODES.OK).json({ message: "Updated" });
  } catch (error: any) {
    return handleErrorResponse(error, res);
  }
});

export const CreateOrder = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const {
      NAME,
      ADDRESS,
      PHONE,
      EMAIL,
      ORIGIN,
      PACKAGE,
      DESTINATION,
      CARRIER,
      TYPEOFSHIPMENT,
      WEIGHT,
      SHIPMENTMODE,
      CARRIERREFERENCENO,
      PRODUCT,
      QTY,
      PAYMENTMODE,
      TOTALFREIGHT,
      EXPECTEDDELIVERYDATE,
      DEPARTURETIME,
      PICKUPDATE,
      PICKUPTIME,
      COMMENTS,
      PIECETYPE,
      DESCRIPTION,
      LENGTH,
      WIDTH,
      WEIGHT_KG,
      HEIGHT_KG,
    } = req.body;

    const requiredFields = [
      "NAME",
      "ADDRESS",
      "PHONE",
      "EMAIL",
      "ORIGIN",
      "PACKAGE",
      "DESTINATION",
      "CARRIER",
    ];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length > 0) {
      return res.status(HTTPCODES.BAD_REQUEST).json({
        error: "Please ensure all required fields are provided.",
      });
    }

    const TRACKINGID = `AB-${generateRandomNumericString()}`;

    const createdOrder = await orderModels.create({
      NAME,
      ADDRESS,
      PHONE,
      EMAIL,
      ORIGIN,
      PACKAGE,
      DESTINATION,
      CARRIER,
      TYPEOFSHIPMENT,
      WEIGHT,
      SHIPMENTMODE,
      CARRIERREFERENCENO,
      PRODUCT,
      QTY,
      PAYMENTMODE,
      TOTALFREIGHT,
      EXPECTEDDELIVERYDATE,
      DEPARTURETIME,
      PICKUPDATE,
      PICKUPTIME,
      COMMENTS,
      PIECETYPE,
      DESCRIPTION,
      LENGTH,
      WIDTH,
      WEIGHT_KG,
      HEIGHT_KG,
      TRACKINGID,
    });

    const DATE = new Date().toLocaleDateString();
    const TIME = new Date().toLocaleTimeString();
    const createdShipmentHistory = await shipmentModels.create({
      DATE,
      TIME,
      LOCATION: ADDRESS,
      STATUS: "On Transit",
      UPDATEDBY: "No Update Yet",
      REMARKS: "No Remarks Yet",
    });

    createdOrder?.ShipmentHistory?.push(
      new mongoose.Types.ObjectId(createdShipmentHistory._id)
    );
    await createdOrder?.save();

    return res
      .status(HTTPCODES.OK)
      .json({ message: "Order created successfully" });
  } catch (error: any) {
    return handleErrorResponse(error, res);
  }
});

export const EditOrder = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { trackingId, id } = req.params;

    const {
      NAME,
      ADDRESS,
      PHONE,
      EMAIL,
      ORIGIN,
      PACKAGE,
      DESTINATION,
      CARRIER,
      TYPEOFSHIPMENT,
      WEIGHT,
      SHIPMENTMODE,
      CARRIERREFERENCENO,
      PRODUCT,
      QTY,
      PAYMENTMODE,
      TOTALFREIGHT,
      EXPECTEDDELIVERYDATE,
      DEPARTURETIME,
      PICKUPDATE,
      PICKUPTIME,
      COMMENTS,
      PIECETYPE,
      DESCRIPTION,
      LENGTH,
      WIDTH,
      WEIGHT_KG,
      STATUS,
      HEIGHT_KG,
      REMARKS,
    } = req.body;

    const order = await orderModels.findOne({ TRACKINGID: trackingId });
    if (!order) {
      return new MainAppError({
        message: "Order not found",
        httpcode: HTTPCODES.NOT_FOUND,
      });
    }

    const updatedOrder = await orderModels.findByIdAndUpdate(
      order?._id,
      {
        NAME,
        ADDRESS,
        PHONE,
        EMAIL,
        ORIGIN,
        PACKAGE,
        DESTINATION,
        CARRIER,
        TYPEOFSHIPMENT,
        WEIGHT,
        SHIPMENTMODE,
        CARRIERREFERENCENO,
        PRODUCT,
        QTY,
        PAYMENTMODE,
        TOTALFREIGHT,
        EXPECTEDDELIVERYDATE,
        DEPARTURETIME,
        PICKUPDATE,
        PICKUPTIME,
        COMMENTS,
        PIECETYPE,
        DESCRIPTION,
        LENGTH,
        WIDTH,
        WEIGHT_KG,
        HEIGHT_KG,
      },
      { new: true }
    );

    const admin = await UserModels.findById(id);
    const shipmentHistoryIds = updatedOrder?.ShipmentHistory?.map(
      (e: any) => e?._id
    );
    const shipment = await shipmentModels.findOneAndUpdate(
      { _id: { $in: shipmentHistoryIds } },
      {
        DATE: new Date().toLocaleDateString(),
        TIME: new Date().toLocaleTimeString(),
        LOCATION: ADDRESS,
        STATUS,
        UPDATEDBY: admin?.name,
        REMARKS,
      },
      { new: true }
    );
    await shipment?.save();
    await updatedOrder?.save();

    return res
      .status(HTTPCODES.OK)
      .json({ message: "Order updated successfully" });
  } catch (error: any) {
    return handleErrorResponse(error, res);
  }
});

export const DeleteOrder = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await orderModels.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      throw new MainAppError({
        message: "Order not found",
        httpcode: HTTPCODES.NOT_FOUND,
      });
    }

    const shipmentHistoryIds =
      deletedOrder.ShipmentHistory?.map((e: any) => e?._id) || [];
    if (shipmentHistoryIds.length > 0) {
      await shipmentModels.deleteMany({ _id: { $in: shipmentHistoryIds } });
    }

    return res
      .status(HTTPCODES.OK)
      .json({ message: "Order deleted successfully" });
  } catch (error: any) {
    return res.status(error.httpcode || HTTPCODES.BAD_REQUEST).json({
      message: "Error deleting order",
      error: error.message || "Unknown error",
    });
  }
});
