import { useState, useEffect, FormEvent } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card'
import { ArrowRight, Check, X, Play, Shield, Heart, Settings, Gamepad2, Monitor } from 'lucide-react'

export default function ProGamingAgent() {
  const [command, setCommand] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [feedback, setFeedback] = useState('')
  const [activeAutomations, setActiveAutomations] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameConnected, setGameConnected] = useState(false)
  const [gameStatus, setGameStatus] = useState('Disconnected')
  const [selectedGame, setSelectedGame] = useState('')

  const games = [
    { id: 'valorant', name: 'Valorant' },
    { id: 'league', name: 'League of Legends' },
    { id: 'fortnite', name: 'Fortnite' },
    { id: 'wow', name: 'World of Warcraft' }
  ]

  const automationOptions = [
    { id: 'auto-loot', name: 'Auto Loot', icon: <Heart className="w-4 h-4" /> },
    { id: 'auto-target', name: 'Auto Target', icon: <Shield className="w-4 h-4" /> },
    { id: 'auto-heal', name: 'Auto Heal', icon: <Play className="w-4 h-4" /> },
    { id: 'auto-farm', name: 'Auto Farm', icon: <Gamepad2 className="w-4 h-4" /> }
  ]

  // Simulate async connection
  useEffect(() => {
    if (selectedGame) {
      setGameStatus('Connecting...')
      const timer = setTimeout(() => {
        setGameConnected(true)
        setGameStatus(`Connected to ${selectedGame}`)
        setOutput(prev => [...prev, `System: Successfully connected to ${selectedGame}`])
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [selectedGame])

  const handleCommandSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    const cmdLine = `> ${command}`
    const cmd = command.toLowerCase()

    // Helper to push new output lines
    const push = (line: string) => setOutput(prev => [...prev, line])

    push(cmdLine)

    if (cmd.includes('help') || cmd === '?') {
      push('Available commands: help, loot, target, heal, farm, feedback, connect, status')
    } else if (cmd.includes('loot')) {
      toggleAutomation('auto-loot')
      push('Toggled Auto Loot')
    } else if (cmd.includes('target')) {
      toggleAutomation('auto-target')
      push('Toggled Auto Target')
    } else if (cmd.includes('heal')) {
      toggleAutomation('auto-heal')
      push('Toggled Auto Heal')
    } else if (cmd.includes('farm')) {
      toggleAutomation('auto-farm')
      push('Toggled Auto Farm')
    } else if (cmd.includes('feedback')) {
      setShowFeedback(true)
      push('Opening feedback form')
    } else if (cmd.includes('connect')) {
      const game = cmd.replace('connect', '').trim()
      const foundGame = games.find(g => g.name.toLowerCase().includes(game) || g.id.includes(game))
      if (foundGame) {
        setSelectedGame(foundGame.name)
        push(`Attempting to connect to ${foundGame.name}...`)
      } else {
        push('Game not found. Available games: ' + games.map(g => g.name).join(', '))
      }
    } else if (cmd.includes('status')) {
      push(`Game Status: ${gameStatus}`)
    } else {
      push('Command not recognized. Type "help" for available commands.')
    }

    setCommand('')
  }

  const toggleAutomation = (id: string) => {
    setActiveAutomations(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
    if (!gameConnected) {
      setOutput(prev => [...prev, 'Warning: Not connected to any game. Automation may not work.'])
    }
  }

  const submitFeedback = (e: FormEvent) => {
    e.preventDefault()
    if (!feedback.trim()) return
    setOutput(prev => [...prev, 'Feedback submitted. Thank you!'])
    setFeedback('')
    setShowFeedback(false)
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
              NEXUS AI Gaming Agent
            </h1>
          </div>
          <div className={\`px-3 py-1 rounded-full text-sm font-medium \${gameConnected ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}\`}>
            {gameStatus}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Command Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-amber-800 bg-gradient-to-b from-black to-gray-900">
              <CardHeader>
                <CardTitle className="text-amber-400">Command Center</CardTitle>
                <CardDescription className="text-gray-400">
                  Direct your AI agent with commands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <form onSubmit={handleCommandSubmit} className="flex gap-2">
                    <Input
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      placeholder="Enter command (type 'help' for options)"
                      className="flex-1 bg-gray-900 border-gray-800 text-amber-100 placeholder-gray-500 focus-visible:ring-amber-500"
                    />
                    <Button
                      type="submit"
                      className="bg-amber-600 hover:bg-amber-500 text-black font-bold"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Execute
                    </Button>
                  </form>

                  {/* Output Console */}
                  <div className="bg-gray-900 border border-gray-800 text-amber-300 p-4 rounded-md font-mono text-sm h-96 overflow-y-auto">
                    {output.length === 0 ? (
                      <p className="text-gray-500">NEXUS AI ready. Type commands above.</p>
                    ) : (
                      output.map((line, i) => (
                        <p key={i} className={line.startsWith('>') ? 'text-gray-400' : ''}>
                          {line.startsWith('>') ? (
                            <span className="text-amber-500">{line}</span>
                          ) : line.includes('Warning') ? (
                            <span className="text-red-400">{line}</span>
                          ) : line.includes('System') ? (
                            <span className="text-green-400">{line}</span>
                          ) : (
                            line
                          )}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Form */}
            {showFeedback && (
              <Card className="border-amber-800 bg-gradient-to-b from-black to-gray-900">
                <CardHeader>
                  <CardTitle className="text-amber-400">Agent Feedback</CardTitle>
                  <CardDescription className="text-gray-400">
                    Help improve NEXUS AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={submitFeedback} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-amber-200">Your feedback</Label>
                      <Textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="What can we improve?"
                        rows={4}
                        className="bg-gray-900 border-gray-800 text-amber-100 placeholder-gray-500 focus-visible:ring-amber-500"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowFeedback(false)}
                        className="border-gray-700 text-amber-100 hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-500 text-black font-bold"
                      >
                        Submit Feedback
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Game Integration */}
            <Card className="border-amber-800 bg-gradient-to-b from-black to-gray-900">
              <CardHeader>
                <CardTitle className="text-amber-400">Game Integration</CardTitle>
                <CardDescription className="text-gray-400">
                  Connect to your game
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-amber-200">Select Game</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {games.map(game => (
                        <Button
                          key={game.id}
                          variant={selectedGame === game.name ? 'default' : 'outline'}
                          onClick={() => setSelectedGame(game.name)}
                          className={\`justify-start \${selectedGame === game.name ? 'bg-amber-600 hover:bg-amber-500 text-black' : 'border-gray-700 text-amber-100 hover:bg-gray-800'}\`}
                        >
                          <Monitor className="w-4 h-4 mr-2" />
                          {game.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      className="w-full bg-amber-600 hover:bg-amber-500 text-black font-bold"
                      onClick={() => {
                        if (selectedGame) {
                          if (gameConnected) {
                            // disconnect
                            setGameConnected(false)
                            setGameStatus('Disconnected')
                            setActiveAutomations([])
                            setOutput(prev => [...prev, \`System: Disconnected from \${selectedGame}\`])
                          } else {
                            // connect
                            setGameConnected(true)
                            setGameStatus(\`Connected to \${selectedGame}\`)
                            setOutput(prev => [...prev, \`System: Connected to \${selectedGame}\`])
                          }
                        }
                      }}
                      disabled={!selectedGame}
                    >
                      {gameConnected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Automation Controls */}
            <Card className="border-amber-800 bg-gradient-to-b from-black to-gray-900">
              <CardHeader>
                <CardTitle className="text-amber-400">Automation Suite</CardTitle>
                <CardDescription className="text-gray-400">
                  Active features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {automationOptions.map(option => (
                    <div
                      key={option.id}
                      className={\`p-3 rounded-lg border \${activeAutomations.includes(option.id) ? 'border-amber-500 bg-amber-900/20' : 'border-gray-700'}\`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={\`p-2 rounded-full \${activeAutomations.includes(option.id) ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-800 text-gray-400'}\`}>
                            {option.icon}
                          </div>
                          <span className="text-amber-100">{option.name}</span>
                        </div>
                        <Button
                          size="sm"
                          variant={activeAutomations.includes(option.id) ? 'default' : 'outline'}
                          onClick={() => toggleAutomation(option.id)}
                          className={activeAutomations.includes(option.id) ? 'bg-amber-600 hover:bg-amber-500 text-black' : 'border-gray-600 text-amber-100 hover:bg-gray-800'}
                        >
                          {activeAutomations.includes(option.id) ? 'Active' : 'Inactive'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="text-xs text-gray-500">
                <Settings className="w-3 h-3 mr-1" />
                Some features require game connection
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}