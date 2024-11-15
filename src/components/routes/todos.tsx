import Header from "../layouts/general/header";
import Navbar from "../layouts/general/navbar";
// import TodoItems from "../layouts/todos/todoItems";
import TodoTable from "../layouts/todos/todoTable";

const Todos = () => {
   
  

    return (
        <div className="flex flex-col w-full h-screen" >
            <Header />
            <div className="flex w-full h-full" >
                <Navbar />
                <main className="flex items-center justify-center w-full" >
                    <TodoTable />
                    
                </main>
            </div>
        </div>
    )
}

export default Todos;