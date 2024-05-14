import { Document, Schema, model } from "mongoose";
import { IShipmentHistory } from "../interface/interface";

interface AllShipmentHistory extends IShipmentHistory, Document {}

const packagesSchema = new Schema<AllShipmentHistory>(
  {
    DATE: {
      type: String,
    },
    TIME: {
      type: String,
    },
    LOCATION: {
      type: String,
    },
    STATUS: {
      type: String,
    },
    UPDATEDBY: {
      type: String,
    },
    REMARKS: {
      type: String,
    },
  },
  { timestamps: true }
);

const shipmentModels = model<AllShipmentHistory>("shipment", packagesSchema);

export default shipmentModels;
