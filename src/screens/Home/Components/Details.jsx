import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/main.css";
import orderStore from "../../../stores/OrderStore";
export function extractDateAndTime(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${year}-${month + 1}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
function Details() {
  const { t } = useTranslation();
  const { order } = orderStore();

  return (
    <div className="detailsContainer">
      <div className="left">
        <h3 style={{ paddingBottom: "10px" }}>{t("Order Details")}</h3>
        <table>
          <thead>
            <tr>
              <th>{t("Hub")}</th>
              <th>{t("Date")}</th>
              <th>{t("Time")}</th>
              <th>{t("Details")}</th>
            </tr>
          </thead>
          <tbody>
            {order
              ? order.TransitEvents?.map((Tevent, index) => (
                  <tr key={index}>
                    <td>{Tevent.hub ? Tevent.hub : "-------"}</td>
                    <td>{extractDateAndTime(Tevent.timestamp).date}</td>
                    <td>{extractDateAndTime(Tevent.timestamp).time}</td>
                    <td>
                      {t(Tevent.state)}
                      {Tevent.reason && (
                        <p style={{ color: "red" }}>{Tevent.reason}</p>
                      )}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      <div className="right">
        <h3 style={{ paddingBottom: "10px" }}>{t("Delivery address")}</h3>
        <div className="upper">
          <p>11 ش عبدالحميد مصطفى ,المهندسين,الجيزة</p>
        </div>
        <div className="lower">
          <div className="left">
            <img src="src\assets\anyQuestion.png" alt="" />
          </div>
          <div className="right">
            <h3>{t("ANY_QUESTION")}</h3>
            <button className="button">{t("QUESTION_BUTTON")}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
