import { useState, useEffect } from 'react';
import { 
  VscCheck, VscChevronDown, VscChevronRight, VscCloudDownload, VscCommentDiscussion, 
  VscEllipsis, VscFiles, VscGitCommit, VscHistory, VscRefresh, VscRepoPush, 
  VscSparkle, VscSync, VscFoldDown, VscListTree
} from 'react-icons/vsc';
import { FaReact } from 'react-icons/fa';

const getRelativeTime = (dateString: string) => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const daysDifference = Math.round((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  return rtf.format(daysDifference, 'day');
};

export const GitPanel = () => {
  const [expandedSections, setExpandedSections] = useState({
    changes: true,
    staged: true,
    unstaged: true,
    graph: false,
    gitlens: false
  });

  const [commits, setCommits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/mehedihassandev/Nebula/commits?per_page=15');
        if (response.ok) {
          const data = await response.json();
          setCommits(data);
        }
      } catch (error) {
        console.error('Failed to fetch commits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex flex-col h-full text-textColor bg-primary font-sans overflow-hidden">
      {/* Header */}
      <div className="h-[36px] flex justify-between items-center px-4 text-[11px] font-semibold tracking-widest text-textMuted uppercase">
        <span>Source Control</span>
        <div className="flex items-center gap-2">
          <button className="hover:text-white transition-colors" title="View as Tree">
            <VscListTree size={14} />
          </button>
          <button className="hover:text-white transition-colors" title="More Actions...">
            <VscEllipsis size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col custom-scrollbar">
        
        {/* CHANGES SECTION */}
        <div className="flex flex-col border-b border-border/30">
          <div 
            className="flex items-center justify-between px-1 py-1 hover:bg-hover cursor-pointer text-xs font-semibold uppercase tracking-wider text-textColor"
            onClick={() => toggleSection('changes')}
          >
            <div className="flex items-center gap-1">
              {expandedSections.changes ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
              <span>Changes</span>
            </div>
            <div className="flex items-center gap-2 pr-2 text-textMuted">
              <VscSparkle size={12} className="hover:text-white" />
              <VscCloudDownload size={12} className="hover:text-white" />
              <VscRepoPush size={12} className="hover:text-white" />
              <VscCommentDiscussion size={12} className="hover:text-white" />
              <VscCheck size={12} className="hover:text-white" />
              <VscRefresh size={12} className="hover:text-white" />
            </div>
          </div>

          {expandedSections.changes && (
            <div className="flex flex-col px-4 py-2 gap-2">
              <div className="relative">
                <textarea 
                  className="w-full bg-primary border border-border rounded-[3px] p-2 text-[13px] text-white resize-none outline-none focus:border-accent min-h-[60px]"
                  placeholder="Message (Cmd+Enter to commit)"
                />
                <VscSparkle size={12} className="absolute top-2 right-2 text-textMuted" />
              </div>
              <div className="flex rounded-[3px] overflow-hidden text-[13px] font-medium h-7 opacity-50 pointer-events-none">
                <button className="flex-1 bg-accent hover:opacity-80 text-[#1e1e20] flex items-center justify-center gap-2 transition-colors">
                  <VscCheck size={14} />
                  <span>Commit</span>
                </button>
                <div className="w-[1px] bg-primary/30" />
                <button className="w-8 bg-accent hover:opacity-80 text-[#1e1e20] flex items-center justify-center transition-colors">
                  <VscChevronDown size={14} />
                </button>
              </div>

              {/* Staged Changes */}
              <div className="mt-2">
                <div 
                  className="flex items-center justify-between py-1 cursor-pointer text-xs text-textColor hover:text-white"
                  onClick={() => toggleSection('staged')}
                >
                  <div className="flex items-center gap-1">
                    {expandedSections.staged ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
                    <span className="font-semibold">Staged Changes</span>
                  </div>
                  <div className="bg-textMuted text-[#1e1e20] text-[9px] font-bold px-[5px] rounded-full mr-1">0</div>
                </div>
              </div>

              {/* Unstaged Changes */}
              <div className="mt-1">
                <div 
                  className="flex items-center justify-between py-1 cursor-pointer text-xs text-textColor hover:text-white"
                  onClick={() => toggleSection('unstaged')}
                >
                  <div className="flex items-center gap-1">
                    {expandedSections.unstaged ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
                    <span className="font-semibold">Changes</span>
                  </div>
                  <div className="bg-textMuted text-[#1e1e20] text-[9px] font-bold px-[5px] rounded-full mr-1">0</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto">
          {/* GRAPH SECTION */}
          <div className="flex flex-col border-t border-border/30">
          <div 
            className="flex items-center justify-between px-1 py-1 hover:bg-hover cursor-pointer text-xs font-semibold uppercase tracking-wider text-textColor"
            onClick={() => toggleSection('graph')}
          >
            <div className="flex items-center gap-1">
              {expandedSections.graph ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
              <span>Graph</span>
            </div>
          </div>
          {expandedSections.graph && (
            <div className="flex flex-col px-2 py-2 gap-[2px] text-[13px] relative overflow-hidden">
              {/* Single continuous line for the branch */}
              <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-accent z-0 opacity-50" />

              {/* Commits */}
              {loading ? (
                <div className="p-2 text-xs text-textMuted">Loading...</div>
              ) : (
                commits.map((commitData) => (
                  <a 
                    key={commitData.sha}
                    href={commitData.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 z-10 hover:bg-hover p-1 rounded cursor-pointer group relative"
                  >
                    <div className="w-[10px] h-[10px] rounded-full border-[2.5px] border-accent bg-primary shrink-0 ml-[5px] z-10" />
                    <img src={commitData.author?.avatar_url || 'https://github.com/identicons/default.png'} alt="Author" className="w-[14px] h-[14px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity ml-1" />
                    <span className="truncate text-textColor group-hover:text-white transition-colors text-[12px]">
                      {commitData.commit.message.split('\n')[0]}
                    </span>
                  </a>
                ))
              )}
            </div>
          )}
        </div>

        {/* GITLENS SECTION */}
        <div className="flex flex-col">
          <div 
            className="flex items-center justify-between px-1 py-1 hover:bg-hover cursor-pointer text-xs font-semibold uppercase tracking-wider text-textColor"
            onClick={() => toggleSection('gitlens')}
          >
            <div className="flex items-center gap-1">
              {expandedSections.gitlens ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
              <span>GitLens</span>
            </div>
          </div>
          {expandedSections.gitlens && (
            <div className="flex flex-col px-2 py-2 gap-1 text-[12px]">
              <div className="flex items-center gap-2 text-textMuted uppercase tracking-wider text-[10px] mb-2 pl-2">
                <span className="font-semibold text-white">COMMITS</span> main
              </div>
              <div className="flex items-center gap-2 hover:bg-hover p-1 px-2 rounded cursor-pointer text-textColor">
                <VscCloudDownload size={14} className="shrink-0 text-accent" />
                <span className="truncate">Fetch from origin/main</span>
              </div>
              <div className="flex items-center gap-2 hover:bg-hover p-1 px-2 rounded cursor-pointer text-textColor">
                <VscSync size={14} className="shrink-0" />
                <span className="truncate">Synchronize Changes</span>
              </div>
              <div className="pl-8 text-[10px] text-textMuted mb-2">— Fetched recently</div>
              
              {/* Dynamic history */}
              {loading ? (
                <div className="p-2 text-xs text-textMuted">Loading...</div>
              ) : (
                commits.map((commitData) => (
                  <a 
                    key={`lens-${commitData.sha}`}
                    href={commitData.html_url}
                    target="_blank"
                    rel="noreferrer" 
                    className="flex items-center gap-2 hover:bg-hover p-1 rounded cursor-pointer group"
                  >
                    <VscChevronRight size={12} className="shrink-0 text-textMuted" />
                    <img src={commitData.author?.avatar_url || 'https://github.com/identicons/default.png'} alt="Author" className="w-[18px] h-[18px] rounded opacity-80 group-hover:opacity-100" />
                    <span className="truncate text-textMuted group-hover:text-white transition-colors">
                      {commitData.commit.message.split('\n')[0]}
                    </span>
                  </a>
                ))
              )}
            </div>
          )}
        </div>

        </div>

      </div>

      {/* Footer Info (Branch / Sync) */}
      <div className="flex justify-between items-center px-4 py-2 text-xs border-t border-border bg-surface shrink-0">
        <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors text-textMuted">
          <VscGitCommit size={14} />
          <span>{loading || !commits.length ? 'main' : `${commits[0].commit.author.name} (${getRelativeTime(commits[0].commit.author.date)})`}</span>
        </div>
      </div>
    </div>
  );
};
