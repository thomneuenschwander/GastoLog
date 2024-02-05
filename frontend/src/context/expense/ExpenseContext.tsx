/* eslint-disable react-hooks/exhaustive-deps */
import { Category, Expense } from "../../resources/expense/expense.resource"
import { createContext, useEffect, useMemo, useState } from "react"
import { useExpenseService } from "../../resources/expense/expense.service"
import { useAuthContext } from "../../hooks/useAuthContext"

export const ExpenseContext = createContext<ExpenseContext | null>(null)

export const ExpenseProvider = ({ children }: IAuthProvider) => {
	// STATES
	const [sortType, setActiveSort] = useState<
		"default" | "ascending" | "descending"
	>("default")
	const [expenses, setExpenses] = useState<Expense[] | null>(null)
	const [sortedExpenses, setSortedExpenses] = useState<Expense[] | null>(null)
	const [availableCategories, setAvailableCategories] = useState<
		Category[] | null
	>(null)
	const [loaded, setLoaded] = useState<boolean>(false)
	// CUSTOMIZED HOOKS
	const expenseService = useExpenseService()
	const authContext = useAuthContext()

	// EXPENSES
	const loadExpenses = async () => {
		try {
			const res = await expenseService.getAllExpenses()
			setExpenses(res)
		} catch (error) {
			console.error("Expense Error", error)
		}
	}

	const getExpenseById = (expenseId: number): Expense | undefined => {
		return expenses?.find((expense) => expense.id === expenseId)
	}

	// EXPENSES CATEGORIES
	const loadCategories = async () => {
		try {
			const res = await expenseService.getAllCategories()
			setAvailableCategories(res)
		} catch (error) {
			console.error("Category error:", error)
		}
	}

	useEffect(() => {
		if (loaded && expenses && sortType === 'default') {
			setSortedExpenses(expenses)
		}
	}, [authContext?.isAuthenticate, loaded, sortType])

	useEffect(() => {
		const fetchData = async () => {
			await loadCategories()
			await loadExpenses()
			setLoaded(true)
		}
		if (authContext?.isAuthenticate && !loaded) {
			fetchData()
		}
	}, [authContext?.isAuthenticate, loaded])

	const sortExpenses = (type: "default" | "ascending" | "descending") => {
		let sortedExpenses: Expense[] | null = null

		if (type === "default") {
			sortedExpenses = expenses
		} else if (type === "ascending") {
			sortedExpenses = [...expenses!].sort((a, b) => a.price - b.price)
		} else if (type === "descending") {
			sortedExpenses = [...expenses!].sort((a, b) => b.price - a.price)
		}
		console.log(sortedExpenses)
		setSortedExpenses(sortedExpenses)
		setActiveSort(type)
	}

	// CALCULATE TOTAL SPENT
	const totalSpent: number = useMemo(() => {
		if (authContext?.isAuthenticate && expenses) {
			return expenses.reduce((acc, exp) => acc + exp.price, 0)
		}
		return 0
	}, [authContext?.isAuthenticate, expenses])

	const contextValue: ExpenseContext = {
		expenses,
		sortedExpenses,
		availableCategories,
		totalSpent,
		loadExpenses,
		getExpenseById,
		loadCategories,
		sortExpenses,
		sortType,
	}

	return (
		<ExpenseContext.Provider value={contextValue}>
			{children}
		</ExpenseContext.Provider>
	)
}

export interface ExpenseContext {
	sortedExpenses: Expense[] | null
	expenses: Expense[] | null
	availableCategories: Category[] | null
	loadExpenses: () => void
	getExpenseById: (expenseId: number) => Expense | undefined
	loadCategories: () => void
	totalSpent: number
	sortExpenses: (type: "default" | "ascending" | "descending") => void
	sortType: "default" | "ascending" | "descending"
}

export interface IAuthProvider {
	children: JSX.Element
}
