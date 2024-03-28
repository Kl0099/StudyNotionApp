import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);
const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");
  const [chartDataStudents, setchartDataStudents] = useState(null);
  const [chartIncomeData, setchartIncomeData] = useState(null);
  const generateRandomColor = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(
				${Math.floor(Math.random() * 256)} ,
				${Math.floor(Math.random() * 256)} ,
				${Math.floor(Math.random() * 256)} 
			
			)`;
      colors.push(color);
    }
    return colors;
  };
  const data = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Dataset 1",
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColor(courses.length),
      },
    ],
  };

  useEffect(() => {
    const chartDataStudents = {
      labels: courses?.map((course) => course.courseName),
      datasets: [
        {
          label: "Student 1",
          data: courses?.map((course) => course.totalEnrolledStudents),
          backgroundColor: generateRandomColor(courses.length),
        },
      ],
    };

    // Data for the chart displaying income information
    const chartIncomeData = {
      labels: courses.map((course) => course.courseName),
      datasets: [
        {
          label: "student 2",
          data: courses.map((course) => course.totalAmountGenerated),
          backgroundColor: generateRandomColor(courses.length),
        },
      ],
    };
    setchartDataStudents(chartDataStudents);
    setchartIncomeData(chartIncomeData);
  }, [courses]);
  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  };

  // useEffect(() => {
  //   console.log("chaet", courses);
  // }, [courses]);

  //  this is the temparary data
  // Generate random course names
  const generateRandomCourseName = () => {
    const adjectives = [
      "Introduction to",
      "Advanced",
      "Intermediate",
      "Fundamentals of",
    ];
    const topics = [
      "Mathematics",
      "Physics",
      "Computer Science",
      "Biology",
      "History",
    ];
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    return `${randomAdjective} ${randomTopic}`;
  };

  // Generate random number of students enrolled
  const generateRandomStudentsEnrolled = () =>
    Math.floor(Math.random() * 100) + 1;

  // Generate temporary fake data
  const tempChartDataStudents = {
    labels: Array.from({ length: 5 }, () => generateRandomCourseName()),
    datasets: [
      {
        data: Array.from({ length: 5 }, () => generateRandomStudentsEnrolled()),
        backgroundColor: generateRandomColor(5), // Assuming 5 courses for example
      },
    ],
  };

  return !courses ? (
    <>Loading...</>
  ) : (
    // <div>hello</div>
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full">
        {/* Render the Pie chart based on the selected chart */}
        {courses ? (
          <Pie
            className="mt-5 border p-2"
            // data={
            //   courses && currChart === "students"
            //     ? chartDataStudents
            //     : chartIncomeData
            // }
            data={
              currChart === "students"
                ? {
                    labels: courses?.map((course) => course.courseName),
                    datasets: [
                      {
                        label: "Student 1",
                        data: courses?.map(
                          (course) => course.totalEnrolledStudents
                        ),
                        backgroundColor: generateRandomColor(courses.length),
                      },
                    ],
                  }
                : {
                    labels: courses?.map((course) => course.courseName),
                    datasets: [
                      {
                        label: "student 2",
                        data: courses?.map(
                          (course) => course.totalAmountGenerated
                        ),
                        backgroundColor: generateRandomColor(courses.length),
                      },
                    ],
                  }
            }
            // data={tempChartDataStudents}
            options={options}
          />
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default InstructorChart;
