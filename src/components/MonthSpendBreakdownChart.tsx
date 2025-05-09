import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {useQuery} from "@tanstack/react-query";
import {useDateContext} from "../context/context.ts";
import {useNavigate} from "react-router-dom";
import {SpendingReport} from "../models/SpendingReport.ts";
import {BudgetClassification} from "../models/enum/BudgetClassification.ts";
import {formatAmount} from "../util/util.ts";
import "../scss/chart.scss";

export default function MonthSpendBreakdownChart() {

    const date = useDateContext();
    const navigate = useNavigate();

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

    const { isPending, error, data } = useQuery({
        queryKey: ["spending", "breakdown", "by-month", date.year, date.month],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/api/secure/spending/breakdown/by-month?year=${date.year}&month=${date.month}`, {
                method: 'GET',
                headers: {
                    'Auth-Token': localStorage.getItem("Auth-Token")!
                },
            })
                .then(response => {
                    if (response.status === 401) {
                        navigate("/logout");
                    }
                    return response.json();
                })
                .then(data => data as SpendingReport)
    });

    if (isPending) {
        return (<div>Loading...</div>);
    }

    if (error) {
        console.error(error);
        return (<div>An error has occurred.</div>);
    }

    type DataPoint = {
        label: string,
        amount: number,
        color: string,
    };

    const classificationData: DataPoint[] = [];
    const budgetData: DataPoint[] = [];

    const determineColor = (classification: BudgetClassification) => {
        switch (classification) {
            case BudgetClassification.Wants:
                return '#EF9C66';
            case BudgetClassification.Needs:
                return '#78ABA8';
            case BudgetClassification.Savings:
                return '#BACD92';
            default:
                return '#9D9D9D';
        }
    }

    data.budget_classifications.forEach((classificationReport) => {

        classificationData.push({
            label: classificationReport.classification,
            amount: classificationReport.total_spent,
            color: determineColor(classificationReport.classification),
        });

        classificationReport.budgets.forEach((budgetReport) => {
            budgetData.push({
                label: budgetReport.title,
                amount: budgetReport.total_spent,
                color: determineColor(classificationReport.classification),
            })
        });

    });

    if (data.total_spent_unbudgeted > 0) {
        const unbudgetedDataPoint = {
            label: 'Unbudgeted',
            amount: data.total_spent_unbudgeted,
            color: '#9D9D9D',
        }
        classificationData.push(unbudgetedDataPoint);
        budgetData.push(unbudgetedDataPoint);
    }

    const chartData = {
        datasets: [
            {
                // label: 'Budget',
                data: budgetData.map((dataPoint) => dataPoint.amount),
                labels: budgetData.map((dataPoint) => dataPoint.label),
                backgroundColor: budgetData.map((dataPoint) => dataPoint.color),
            }, {
                // label: 'Classification',
                data: classificationData.map((dataPoint) => dataPoint.amount),
                labels: classificationData.map((dataPoint) => dataPoint.label),
                backgroundColor: classificationData.map((dataPoint) => dataPoint.color),
            }
        ]
    };

    return (
        <div className={"chart__container"}>
            <div className={"chart__title"}>Spending Breakdown</div>
            <Doughnut data={chartData} options={{
                plugins: {
                    legend: {
                        display: false
                    },
                    datalabels: {
                        formatter: (value, context) => {
                            const percentage = value / context.chart._metasets[context.datasetIndex].total * 100;

                            if (percentage < 3) {
                                return "";
                            }

                            return percentage.toFixed(0) + '%';
                        },
                        font: {
                            size: 14,
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem)=> {
                                const label = tooltipItem.dataset.labels[tooltipItem.dataIndex];
                                const amount = formatAmount(tooltipItem.dataset.data[tooltipItem.dataIndex]);
                                return label + ": " + amount;
                            }
                        }
                    }
                }
            }} />
        </div>
    );
}