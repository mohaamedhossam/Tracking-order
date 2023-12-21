import { Steps } from "antd";
import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { extractDateAndTime } from "./Details";

import orderStore from "../../../stores/OrderStore";

function Tracking() {
  const { t } = useTranslation();
  const { order, getOrder } = orderStore();

  const id = 7234258;

  useEffect(() => {
    getOrder(id);
  }, []);

  const steps = [
    {
      title: "Order Created",
    },
    {
      title: "TICKET_CREATED",
    },
    {
      title: "Out for Delivery",
    },
    {
      title: "DELIVERED",
    },
  ];

  const currentStepIndex = order
    ? steps.findIndex((step) => step.title === order?.CurrentStatus?.state)
    : -1;

  return (
    <div className="TrackContainer">
      <div className="upper">
        <div className="inner">
          <h2>
            {t("Tracking id")} :{order?.TrackingNumber}
          </h2>
          <p style={{ color: "red" }}>{t(order?.CurrentStatus?.state)}</p>
        </div>
        <div className="inner">
          <h2>{t("last update")} </h2>
          <p>{extractDateAndTime(order?.CurrentStatus?.timestamp).date}</p>
        </div>
        <div className="inner">
          <h2>{t("Dealer name")}</h2>
          <p>{order.provider}</p>
        </div>
        <div className="inner">
          <h2>{t("Delivery_Date")}</h2>
          <p>{extractDateAndTime(order.PromisedDate).date}</p>
        </div>
      </div>
      <hr />
      <div className="lower">
        <Steps direction="horizontal" current={currentStepIndex}>
          {steps.map((item) => (
            <Steps.Step key={item.title} title={t(item.title)} />
          ))}
        </Steps>
      </div>
    </div>
  );
}

export default Tracking;
