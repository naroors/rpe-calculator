"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dumbbell, BarChart, Trash2, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"
import type { Locale } from "@/i18n-config"

interface HistoryEntry {
  id: string
  weight: number
  reps: number
  rpe: number
  oneRepMax: number
  date: string
  liftType: string
}

interface RPECalculatorProps {
  dictionary: any
  lang: Locale
}

export default function RPECalculator({ dictionary, lang }: RPECalculatorProps) {
  const [weight, setWeight] = useState<number>(100)
  const [reps, setReps] = useState<number>(5)
  const [rpe, setRpe] = useState<number>(8)
  const [oneRepMax, setOneRepMax] = useState<number>(0)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [liftType, setLiftType] = useState<string>("Squat")
  const [filterLiftType, setFilterLiftType] = useState<string>("All")

  useEffect(() => {
    const savedHistory = localStorage.getItem("rpeHistory")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("rpeHistory", JSON.stringify(history))
  }, [history])

  useEffect(() => {
    calculateOneRepMax()
  }, [weight, reps, rpe])

  const calculateOneRepMax = () => {
    const brzycki = weight / (1.0278 - 0.0278 * reps)
    const epley = weight * (1 + 0.0333 * reps)
    const lander = (100 * weight) / (101.3 - 2.67123 * reps)
    const lombardi = weight * Math.pow(reps, 0.1)
    const mayhew = (100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * reps))
    const oConner = weight * (1 + 0.025 * reps)
    const wathan = (100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * reps))

    const average = (brzycki + epley + lander + lombardi + mayhew + oConner + wathan) / 7

    // Adjust the average based on RPE
    const rpeAdjustment = (10 - rpe) * 0.03; // Adjusted to reflect that lower RPE is better
    const adjustedOneRepMax = average * (1 + rpeAdjustment); // Inverted adjustment

    setOneRepMax(Math.round(adjustedOneRepMax * 100) / 100)
  }

  const saveToHistory = () => {
    if (weight <= 0 || reps <= 0 || rpe < 6 || rpe > 10) {
      // Optionally, you can add error handling here
      console.error("Invalid input values");
      return;
    }

    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      weight,
      reps,
      rpe,
      oneRepMax,
      date: new Date().toLocaleDateString(lang),
      liftType,
    };

    setHistory((prev) => [newEntry, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setHistory([])
  }

  const deleteHistoryEntry = (id: string) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id))
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(lang)
    } catch (e) {
      return dateString
    }
  }

  const handleFilterChange = (type: string) => {
    setFilterLiftType(type);
  }

  const filteredHistory = filterLiftType === "All" 
    ? history 
    : history.filter(entry => entry.liftType === filterLiftType);

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <LanguageSwitcher lang={lang} label={dictionary.language} />
        <ThemeToggle />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6" />
            {dictionary.calculator.title}
          </CardTitle>
          <CardDescription>{dictionary.calculator.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="liftType">{dictionary.calculator.liftType}</Label>
              <Select value={liftType} onValueChange={setLiftType}>
                <SelectTrigger id="liftType">
                  <SelectValue placeholder="Select Lift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Squat">Squat</SelectItem>
                  <SelectItem value="Bench">Bench</SelectItem>
                  <SelectItem value="Deadlift">Deadlift</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">{dictionary.calculator.weight}</Label>
              <Input
                id="weight"
                type="number"
                min="1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reps">{dictionary.calculator.repetitions}</Label>
              <Select value={reps.toString()} onValueChange={(value) => setReps(Number(value))}>
                <SelectTrigger id="reps">
                  <SelectValue placeholder={dictionary.calculator.selectReps} />
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
                <Label htmlFor="rpe">{dictionary.calculator.rpe}</Label>
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
            <div className="text-sm font-medium text-muted-foreground mb-2">
              {dictionary.calculator.estimatedOneRepMax}
            </div>
            <div className="text-4xl font-bold">{oneRepMax}</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveToHistory} className="w-full">
            {dictionary.calculator.saveToHistory}
          </Button>
        </CardFooter>
      </Card>

      {/* History Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            {dictionary.history.title}
          </CardTitle>
          <Button variant="outline" size="icon" onClick={clearHistory}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {/* Filter Section */}
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="filterLiftType" className="mr-2">{dictionary.history.liftType}</Label>
            <Select value={filterLiftType} onValueChange={handleFilterChange}>
              <SelectTrigger id="filterLiftType">
                <SelectValue placeholder="Filter by Lift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{dictionary.filterAll}</SelectItem>
                <SelectItem value="Squat">Squat</SelectItem>
                <SelectItem value="Bench">Bench</SelectItem>
                <SelectItem value="Deadlift">Deadlift</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{dictionary.history.date}</TableHead>
                  <TableHead>{dictionary.history.liftType}</TableHead>
                  <TableHead>{dictionary.history.weight}</TableHead>
                  <TableHead>{dictionary.history.reps}</TableHead>
                  <TableHead>{dictionary.history.rpe}</TableHead>
                  <TableHead>{dictionary.history.oneRepMax}</TableHead>
                  <TableHead className="w-[50px]">{dictionary.history.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{formatDate(entry.date)}</TableCell>
                      <TableCell>{entry.liftType}</TableCell>
                      <TableCell>{entry.weight}</TableCell>
                      <TableCell>{entry.reps}</TableCell>
                      <TableCell>{entry.rpe}</TableCell>
                      <TableCell className="font-medium">{entry.oneRepMax}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteHistoryEntry(entry.id)}
                          title={dictionary.history.deleteEntry}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500">
                      {dictionary.history.recordsFound}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

