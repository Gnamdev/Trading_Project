import { Button } from "@/components/ui/button";
import { fetchMarketChart } from "@/store/coin/Action";
import { store } from "@/store/Store";
import { getChartByID } from "apexcharts";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";

export default function StockChart({ coinId }) {
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);

  const timeSeries = [
    {
      keyword: "DIGITAL_CURRENCY_DAILY",
      key: "Time Series (Daily)",
      lable: "1 Day",
      value: 1,
    },
    {
      keyword: "DIGITAL_CURRENCY_WEEKLY",
      key: "Weekly Time Series ",
      lable: "1 Week",
      value: 7,
    },
    {
      keyword: "DIGITAL_CURRENCY_MONTHLY",
      key: " Monthly Time Series",
      lable: "1 Month",
      value: 30,
    },
    {
      keyword: "DIGITAL_CURRENCY_YEARLY",
      key: " Yearly Time Series",
      lable: "1 Year",
      value: 365,
    },
  ];
  const [activeLable, setActiveLable] = useState(timeSeries[0]);
  const searies = [
    {
      data: coin.marketChart.data,
    },
  ];

  const option = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 450,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false, // Ensure data labels are disabled globally
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
    },
    colors: ["#758AA2"],
    markers: {
      colors: ["#fff"],
      strokeColor: "#fff",
      size: 0,
      strokeWidth: 1,
      style: "hollow",
    },
    tooltip: {
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#47535E",
      strokeDashArray: 4,
      show: true,
    },
  };

  function handleActiveLable(value) {
    setActiveLable(value);
  }

  useEffect(() => {
    dispatch(
      fetchMarketChart({
        coinId,
        days: activeLable.value,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, [dispatch, coinId, activeLable]);

  return (
    <div>
      <div className="space-x-3">
        {timeSeries.map((item) => (
          <Button
            key={item.lable}
            onClick={() => handleActiveLable(item)}
            variant={activeLable.lable == item.lable ? "default" : "outline"}
          >
            {item.lable}
          </Button>
        ))}
      </div>

      <div id="chart-timelines">
        <ReactApexChart
          options={option}
          series={searies}
          type="area"
          height={450}
        />
      </div>
    </div>
  );
}
