import { getCodes, generateCode, deleteCode } from '../../../../actions/auth';
import { revalidatePath } from 'next/cache';

export default async function CodeGeneratorPage() {
  const codes = await getCodes();

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 5%', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '1rem' }}>Admin: Access Code Generator</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Generate unique codes to grant users access to the platform securely via the database.
        </p>

        <section className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Create New Code</h2>
              <p style={{ color: 'var(--text-muted)' }}>This code will instantly grant access to a new user account.</p>
            </div>
            <form action={async () => { 'use server'; await generateCode(); }}>
              <button type="submit" className="btn-primary">Generate Code</button>
            </form>
          </div>
        </section>

        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Active & Used Codes ({codes.length})</h2>
          
          {codes.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No codes generated yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {codes.map(c => (
                <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--surface-border)', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', fontFamily: 'monospace', textDecoration: c.isUsed ? 'line-through' : 'none', color: c.isUsed ? 'var(--text-muted)' : 'inherit' }}>
                    {c.code} {c.isUsed && '(USED)'}
                  </span>
                  <form action={async () => { 'use server'; await deleteCode(c.id); }}>
                    <button type="submit" style={{ background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>Delete Code</button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
