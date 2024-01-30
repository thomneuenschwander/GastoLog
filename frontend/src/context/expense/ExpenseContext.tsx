/* eslint-disable react-hooks/exhaustive-deps */
import { Category, Expense } from "../../resources/expense/expense.resource"
import { createContext, useEffect, useMemo, useState } from "react"
import { useExpenseService } from "../../resources/expense/expense.service"
import { useAuthContext } from "../../hooks/useAuthContext"

export const ExpenseContext = createContext<ExpenseContext | null>(null)

export const ExpenseProvider = ({ children }: IAuthProvider) => {
	const [expenses, setExpenses] = useState<Expense[] | null>(null)
	const [availableCategories, setAvailableCategories] = useState<
		Category[] | null
	>(null)
	const [loaded, setLoaded] = useState<boolean>(false)

	const expenseService = useExpenseService()
	const authContext = useAuthContext()

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

	const loadCategories = async () => {
		try {
			const res = await expenseService.getAllCategories()
			setAvailableCategories(res)
		} catch (error) {
			console.error("Category error:", error)
		}
	}

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

	const totalSpent: number = useMemo(() => {
		if (authContext?.isAuthenticate && expenses) {
			return expenses.reduce((acc, exp) => acc + exp.price, 0)
		}
		return 0
	}, [authContext?.isAuthenticate, expenses])

	const contextValue: ExpenseContext = {
		expenses,
		availableCategories,
		totalSpent,
		loadExpenses,
		getExpenseById,
		loadCategories,
	}

	return (
		<ExpenseContext.Provider value={contextValue}>
			{children}
		</ExpenseContext.Provider>
	)
}

export interface ExpenseContext {
	expenses: Expense[] | null
	availableCategories: Category[] | null
	loadExpenses: () => void
	getExpenseById: (expenseId: number) => Expense | undefined
	loadCategories: () => void
	totalSpent: number
}

export interface IAuthProvider {
	children: JSX.Element
}
