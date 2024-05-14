import mongoose, { Document, Schema, model } from "mongoose";
import { Iorder } from "../interface/interface";

interface order extends Iorder, Document {}

const orderSchema = new Schema<order>(
  {
    NAME: {
      type: String,
    },
    ADDRESS: {
      type: String,
    },
    PHONE: {
      type: String,
    },
    EMAIL: {
      type: String,
    },
    ORIGIN: {
      type: String,
    },
    PACKAGE: {
      type: String,
    },

    DESTINATION: {
      type: String,
    },

    CARRIER: {
      type: String,
    },

    TYPEOFSHIPMENT: {
      type: String,
    },

    WEIGHT: {
      type: String,
    },

    SHIPMENTMODE: {
      type: String,
    },

    CARRIERREFERENCENO: {
      type: String,
    },

    PRODUCT: {
      type: String,
    },

    QTY: {
      type: String,
    },

    PAYMENTMODE: {
      type: String,
    },

    TOTALFREIGHT: {
      type: String,
    },

    EXPECTEDDELIVERYDATE: {
      type: String,
    },

    DEPARTURETIME: {
      type: String,
    },

    PICKUPDATE: {
      type: String,
    },

    PICKUPTIME: {
      type: String,
    },

    COMMENTS: {
      type: String,
    },
    TRACKINGID: String,
    PIECETYPE: String,
    DESCRIPTION: String,
    LENGTH: String,
    WIDTH: String,
    HEIGHT_KG: String,
    WEIGHT_KG: String,

    ShipmentHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shipment",
      },
    ],
  },
  { timestamps: true }
);

const orderModels = model<order>("orders", orderSchema);

export default orderModels;
