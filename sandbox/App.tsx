import React, { useState } from 'react'
import {
  ThemeProvider,
  Button,
  CustomCursor,
  PillToggle,
  FilterBar,
  EmptyStatePanel,
  GlobalLoadingBar,
} from '@platform/design-system'
import { ShoppingBag } from 'lucide-react'

export default function App() {
  const [activeTab, setActiveTab] = useState<string | null>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [isPending, setIsPending] = useState(false)
  const [loading, setLoading] = useState(false)

  const triggerLoading = () => {
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      setLoading(true)
      setTimeout(() => setLoading(false), 800)
    }, 1500)
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <CustomCursor />
      <GlobalLoadingBar isPending={isPending} loading={loading} />
      
      <div className="min-h-screen bg-background text-foreground p-8 space-y-12 max-w-5xl mx-auto">
        <header className="space-y-4">
          <span className="ds-uppercase-eyebrow text-primary">Design System Sandbox</span>
          <h1 className="text-5xl ds-hero-title">Nyxoris UI Components</h1>
          <p className="text-muted-foreground">
            Testbed for checking newly promoted and standard components in a framework-agnostic React environment.
          </p>
        </header>

        <section className="space-y-4 p-6 ds-glass-panel rounded-2xl">
          <h2 className="text-xl font-semibold">1. Global Loading Bar</h2>
          <p className="text-sm text-muted-foreground">Click to trigger loading simulation across the top of the viewport.</p>
          <Button onClick={triggerLoading}>Simulate Router Transition</Button>
        </section>

        <section className="space-y-4 p-6 ds-glass-panel rounded-2xl">
          <h2 className="text-xl font-semibold">2. Pill Toggle</h2>
          <PillToggle
            items={['All', 'Electronics', 'Fashion', 'Home Decor']}
            activeItem={activeTab}
            onItemChange={setActiveTab}
          />
          <p className="text-sm text-muted-foreground mt-2">Active: {activeTab || 'None'}</p>
        </section>

        <section className="space-y-4 p-6 ds-glass-panel rounded-2xl">
          <h2 className="text-xl font-semibold">3. Filter Bar</h2>
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={['Tất cả', 'Điện tử', 'Quần áo', 'Gia dụng']}
            includeAllOption
            allCategoryLabel="Tất cả"
          />
          <div className="text-sm text-muted-foreground mt-2">
            <p>Query: "{searchQuery}"</p>
            <p>Category: "{activeCategory}"</p>
          </div>
        </section>

        <section className="space-y-4 p-6 ds-glass-panel rounded-2xl">
          <h2 className="text-xl font-semibold">4. Empty State Panel</h2>
          <EmptyStatePanel
            icon={<ShoppingBag className="h-10 w-10 text-muted-foreground" />}
            title="Không tìm thấy sản phẩm nào"
            description="Hãy thử thay đổi từ khóa tìm kiếm hoặc lọc theo danh mục khác."
            primaryActionNode={
              <Button onClick={() => { setSearchQuery(''); setActiveCategory('Tất cả'); }}>
                Reset Filters
              </Button>
            }
          />
        </section>
      </div>
    </ThemeProvider>
  )
}
