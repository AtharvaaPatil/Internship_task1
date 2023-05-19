// document.addEventListener("DOMContentLoaded", function() {
//     // Fetch the JSON data
//     fetch("test.json")
//       .then(response => response.json())
//       .then(data => {
//         // Retrieve the necessary elements
//         const employeeTable = document.getElementById("employeeTable");
//         const employeeList = document.getElementById("employeeList");
//         const searchInput = document.getElementById("searchInput");
//         const filterSelect = document.getElementById("filterSelect");
  
//         // Update the table with the employee data
//         function updateTable() {
//           // Clear the previous table data
//           employeeList.innerHTML = "";
  
//           // Retrieve the search query and filter value
//           const searchQuery = searchInput.value.toLowerCase();
//           const filterValue = filterSelect.value;
  
//           // Filter and search the employee data
//           // Filter and search the employee data
// const filteredData = data.employees.filter(employee => {
//   if (filterValue !== "all" && employee.designation !== filterValue) {
//     return false;
//   }
//   if (searchQuery && employee.name.toLowerCase().indexOf(searchQuery) === -1) {
//     return false;
//   }
//   return true;
// });



document.addEventListener("DOMContentLoaded", function() {
    // Fetch the JSON data
    fetch("test.json")
      .then(response => response.json())
      .then(data => {
        // Retrieve the necessary elements
        const employeeTable = document.getElementById("employeeTable");
        const employeeList = document.getElementById("employeeList");
        const searchInput = document.getElementById("searchInput");
        const filterSelect = document.getElementById("filterSelect");
  
        // Update the table with the employee data
        function updateTable() {
          // Clear the previous table data
          employeeList.innerHTML = "";
  
          // Retrieve the search query and filter value
          const searchQuery = searchInput.value.toLowerCase();
          const filterValue = filterSelect.value;
  
          // Filter and search the employee data
          const filteredData = data.employees.filter(employee => {
            if (filterValue !== "all" && employee.designation !== filterValue && employee.designation !== null && employee.designation !== undefined) {
              return false;
            }
            if (searchQuery && employee.name.toLowerCase().indexOf(searchQuery) === -1) {
              return false;
            }
            return true;
          });
  
  

  
          // Populate the table with the filtered and searched data
          filteredData.forEach(employee => {
            const row = document.createElement("tr");
  
            const nameCell = document.createElement("td");
            nameCell.textContent = employee.name || "N/A";
            row.appendChild(nameCell);
  
            const designationCell = document.createElement("td");
            designationCell.textContent = employee.designation || "N/A";
            row.appendChild(designationCell);
  
            const skillsCell = document.createElement("td");
            skillsCell.textContent = employee.skills ? employee.skills.join(", ") : "N/A";
            row.appendChild(skillsCell);
  
            const projectsCell = document.createElement("td");
            const projectsList = document.createElement("ul");
            if (employee.projects) {
              employee.projects.forEach(project => {
                const projectItem = document.createElement("li");
                projectItem.innerHTML = `<strong>${project.name}</strong>`;
                const teamSize = project.team.length;
                const completedTasks = project.tasks.filter(task => task.status === "Completed").length;
                projectItem.innerHTML += `<br>Team Size: ${teamSize}`;
                projectItem.innerHTML += `<br>Completed Tasks: ${completedTasks}`;
                projectsList.appendChild(projectItem);
              });
            } else {
              projectsList.textContent = "N/A";
            }
            projectsCell.appendChild(projectsList);
            row.appendChild(projectsCell);
  
            const teamSizeCell = document.createElement("td");
            teamSizeCell.textContent = employee.projects ? employee.projects.reduce((acc, project) => acc + project.team.length, 0) : "N/A";
            row.appendChild(teamSizeCell);
  
            const completedTasksCell = document.createElement("td");
            completedTasksCell.textContent = employee.projects ? employee.projects.reduce((acc, project) => {
              const completedTasks = project.tasks.filter(task => task.status === "Completed").length;
              return acc + completedTasks;
            }, 0) : "N/A";
            row.appendChild(completedTasksCell);
  
            employeeList.appendChild(row);
          });
        }
  
        // Event listeners for search and filter
        searchInput.addEventListener("input", updateTable);
        filterSelect.addEventListener("change", updateTable);
  
        // Initial table update
        updateTable();
      })
      .catch(error => console.error("Error loading data:", error));
  });
  