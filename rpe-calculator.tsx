"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dumbbell, BarChart, Trash2 } from "lucide-react"

interface HistoryEntry {
  id: string
  weight: number
  reps: number
  rpe: number
  oneRepMax: number
  date: string
}

export default function RPECalculator() {
  const [weight, setWeight] = useState<number>(100)
  const [reps, setReps] = useState<number>(5)
  const [rpe, setRpe] = useState<number>(8)
  const [oneRepMax, setOneRepMax] = useState<number>(0)
  const [history, setHistory] = useState<HistoryEntry[]>([])

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("rpeHistory")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("rpeHistory", JSON.stringify(history))
  }, [history])

  // Calculate 1RM whenever inputs change
  useEffect(() => {
    calculateOneRepMax()
  }, [weight, reps, rpe])

  const calculateOneRepMax = () => {
    // Common RPE formula: Weight × (1 + (0.033 × Reps × (10 - RPE)))
    const calculatedOneRepMax = weight * (1 + 0.033 * reps * (10 - rpe))
    setOneRepMax(Math.round(calculatedOneRepMax * 100) / 100)
  }

  const saveToHistory = () => {
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      weight,
      reps,
      rpe,
      oneRepMax,
      date: new Date().toLocaleDateString(),
    }
    setHistory((prev) => [newEntry, ...prev].slice(0, 10)) // Keep only the 10 most recent entries
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6" />
            RPE Calculator
          </CardTitle>
          <CardDescription>Calculate your estimated one-rep max based on weight, reps, and RPE</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg/lbs)</Label>
              <Input
                id="weight"
                type="number"
                min="1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reps">Repetitions</Label>
              <Select value={reps.toString()} onValueChange={(value) => setReps(Number(value))}>
                <SelectTrigger id="reps">
                  <SelectValue placeholder="Select reps" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="rpe">RPE (Rate of Perceived Exertion)</Label>
                <span className="text-sm font-medium">{rpe}</span>
              </div>
              <Slider
                id="rpe"
                min={6}
                max={10}
                step={0.5}
                value={[rpe]}
                onValueChange={(values) => setRpe(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-6 text-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">Estimated One-Rep Max</div>
            <div className="text-4xl font-bold">{oneRepMax}</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveToHistory} className="w-full">
            Save to History
          </Button>
        </CardFooter>
      </Card>

      {history.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              History
            </CardTitle>
            <Button variant="outline" size="icon" onClick={clearHistory}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Reps</TableHead>
                  <TableHead>RPE</TableHead>
                  <TableHead>1RM</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.weight}</TableCell>
                    <TableCell>{entry.reps}</TableCell>
                    <TableCell>{entry.rpe}</TableCell>
                    <TableCell className="font-medium">{entry.oneRepMax}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

