import Todo from "./components/Todo"


function App() {
  
  return (
    <>
    <main className="bg-gray-800 min-w-screen min-h-screen flex flex-col items-center justify-center text-gray-100">
    <h1 className="text-4xl mb-8">Todo App</h1>
    <Todo />
    </main>
    </>
  )
}

export default App
