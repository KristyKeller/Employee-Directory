import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SearchForm from "./SearchForm";
import UserDetail from "./UserDetail";
import API from "../utils/API";

class EmployeeContainer extends Component {
  state = {
    search: "",
    employeeList: [],
    employeeFilter: [],
    listOrder: ""
  };

  // When this component mounts, call API to find random users when the page first loads
  componentDidMount() {
    // console.log(res.data);
    API.getAllEmployees().then(res => this.setState({
      employeeList: res.data.results,
      employeeFilter: res.data.results
    })).catch(err => console.log(err))
  }

  //This sorts the employee by first name when the Name table header is clicked
  sortEmpByName = () => {
    const empFilter = this.state.employeeFilter;
    // console.log(empFilter)
    if (this.state.listOrder === "ascending") {
      const empSort = empFilter.sort((empA, empB) => (empA.name.first > empB.name.first) ? 1 : -1)
      // console.log(empSort)
      this.setState({
        employeeFilter: empSort,
        listOrder: "descending"
      })
    } else {
      const empSort = empFilter.sort((empA, empB) => (empA.name.first > empB.name.first) ? -1 : 1)
      // console.log(empSort)
      this.setState({
        employeeFilter: empSort,
        listOrder: "ascending"
      })
    }
  }

  //Searches all users and sets state
  searchUsers = () => {
    API.getAllEmployees().then(res => this.setState({
      employeeList: res.data.results,
      employeeFilter: res.data.results,
    })).catch(err => console.log(err));
  };

  //Dynamic user input functionality to match values already in table from API call to RandomUser
  handleInputChange = event => {
    const employeeList = this.state.employeeList;
    const input = event.target.value.toLowerCase();
    const employeeFilter = employeeList.filter(employee => employee.name.first.toLowerCase().indexOf(input) > -1)
    this.setState({
      employeeFilter
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-4">
            <Card heading="Search">
              <SearchForm
                employee={this.state.employeeList}
                handleInputChange={this.handleInputChange}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-8">
            <Card
              heading={"Employee Directory"}
            >
              <UserDetail results={this.state.employeeFilter}
                sortEmpByName={this.sortEmpByName}
              />

            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EmployeeContainer;