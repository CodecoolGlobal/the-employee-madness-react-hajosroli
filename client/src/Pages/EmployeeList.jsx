import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal }).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};
const updateEmployee = (employee, empId) => {
  return fetch(`/api/employees/${empId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};


const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [order, setOrder] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [id, setId] = useState('')
  

  const convertSalary = (slry) => {
   if(slry !== null){
    let sal = slry.toString()
    return sal.substring(0, sal.length - 3) + "." + sal.substring(sal.length - 3, sal.length) + "$";
   }
  } 

  /*const handleChange2 = (present, index, empId) => {
    setData(oldData => oldData.map((employee, i) => 
    (i  === index)? {...employee, present: !employee.present}:
    employee
    ))
  }*/
  
  const handleChange = (present, index, empId) => {
    let employees = [...data];
    let employee = employees[index];
    employee.present = !present;
    setData(employees);
    updateEmployee(employees[index], empId)
    .then(()=> (console.log('updated')))
  }
 

  const sorting = (col) => {
    if(order === 'ASC' || order === ''){
      const sorted = [...data].sort((a, b) => 
        a[col].toLowerCase() > b[col].toLowerCase()? 1 : -1);
      setData(sorted)
      setOrder('DSC')
      } else if(order === 'DSC'){
        const sorted = [...data].sort((a, b) => 
        a[col].toLowerCase() < b[col].toLowerCase()? 1 : -1);
      setData(sorted)
      setOrder('ASC')
      }
    }

    const sortingLastName = (col) => {
      if(order === 'ASC' || order === ''){
        const sorted = [...data].sort((a, b) => 
          a[col].split(' ').slice(-1).join(' ').toLowerCase() > b[col].split(' ').slice(-1).join(' ').toLowerCase()? 1 : -1);
        setData(sorted)
        setOrder('DSC')
        } else if(order === 'DSC'){
          const sorted = [...data].sort((a, b) => 
          a[col].split(' ').slice(-1).join(' ').toLowerCase() < b[col].split(' ').slice(-1).join(' ').toLowerCase()? 1 : -1);
        setData(sorted)
        setOrder('ASC')
        }
      }
      
     const sortingMiddleName = (col) => {
      if(order === 'ASC' || order === ''){
        const sorted = [...data].sort((a, b) => 
          a[col].split(' ')[1].toLowerCase() > b[col].split(' ')[1].toLowerCase()? 1 : -1);
        setData(sorted)
        setOrder('DSC')
        } else if(order === 'DSC'){
          const sorted = [...data].sort((a, b) => 
          a[col].split(' ')[1].toLowerCase() < b[col].split(' ')[1].toLowerCase()? 1 : -1);
        setData(sorted)
        setOrder('ASC')
        }
      }
    

  const handleFilter = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredEmployees = data ? data.filter(e => {
      return e.position.toLowerCase().includes(searchTerm.toLowerCase()) 
      ||
       e.level.toLowerCase().includes(searchTerm.toLowerCase())
  }): [];

  // Delete confirmatio
  const showConfirmation = (index, empId) => {
    console.log(data[index])
    if(data[index]._id === empId){
      setShowConfirm(true)
      setId(empId)
    }
  }
 
  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
    setShowConfirm(false)
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        setData(employees);
        
        
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData([]);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
  <>
  <div>
    <input 
    className="filterbyposition" 
    type="text" placeholder="filter by position" 
    value={searchTerm} 
    onChange={handleFilter}>
    </input>
    <button onClick={() => sorting('name')}>Sort by Name</button>
    <button onClick={() => sorting('level')}>Sort by Level</button>
    <button onClick={() => sorting('position')}>Sort by Position</button>
    <button onClick={() => sortingLastName('name')}>Sort by Last Name</button>
    <button onClick={() => sortingMiddleName('name')}>Sort by Middle Name</button>  
  </div>
  <EmployeeTable 
  employees={filteredEmployees} 
  onDelete={handleDelete} 
  id={id} 
  showConfirmation={showConfirmation} 
  showConfirm={showConfirm} 
  setShowConfirm={setShowConfirm} 
  sorting={sorting}  
  handleChange={handleChange} 
  convertSalary={convertSalary}
  //startDate={startDate} 
  />
  
  </>
  )
};

export default EmployeeList;
