import { useState } from 'react'
import ParticleCanvas from './components/ParticleCanvas'
import WelcomePage from './pages/WelcomePage'
import MainPage from './pages/MainPage'
import JournalPage from './pages/JournalPage'
import { useLocalData } from './hooks/useLocalData'

type View = 'main' | 'journal'

export default function App() {
  const {
    data,
    isNew,
    initUser,
    addRecord,
    totalCount,
    stage,
    progressInStage,
    totalSaved,
    streak,
  } = useLocalData()

  const [view, setView] = useState<View>('main')

  return (
    <>
      <ParticleCanvas />

      {isNew ? (
        <WelcomePage onComplete={initUser} />
      ) : view === 'journal' ? (
        <JournalPage records={data!.records} onBack={() => setView('main')} />
      ) : (
        <MainPage
          data={data!}
          stage={stage}
          progressInStage={progressInStage}
          totalCount={totalCount}
          totalSaved={totalSaved}
          streak={streak}
          onAddRecord={addRecord}
          onShowJournal={() => setView('journal')}
        />
      )}
    </>
  )
}
