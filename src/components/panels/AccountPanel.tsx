import { VscCheck, VscChevronRight } from 'react-icons/vsc';

export const AccountPanel = ({ closePopup }: { closePopup: () => void }) => {
  const glassmorphismClasses =
    'flex flex-col text-textColor bg-primary backdrop-blur-3xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] rounded-lg font-sans overflow-hidden py-1 w-64';

  const handleGitHub = () => {
    closePopup();
    window.open('https://github.com/mehedihassandev', '_blank');
  };

  return (
    <div className={glassmorphismClasses}>
      <div className="flex flex-col py-2 text-[13px] overflow-y-auto custom-scrollbar">
        {/* Account List */}
        <div 
          className="flex items-center justify-between px-6 py-1.5 hover:bg-accent hover:text-white cursor-pointer group text-textColor"
          onClick={handleGitHub}
        >
          <span>mehedihassandev (GitHub)</span>
          <VscChevronRight
            size={14}
            className="text-textMuted group-hover:text-white"
          />
        </div>

        <div className="h-[1px] bg-border/50 my-1 mx-2" />

        {/* Sync Status */}
        <div className="flex items-center px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer group text-textColor">
          <div className="w-6 flex justify-center text-textColor group-hover:text-white">
            <VscCheck size={14} />
          </div>
          <span>Settings Sync is On</span>
        </div>

        <div className="h-[1px] bg-border/50 my-1 mx-2" />

        {/* Cloud/Tunnel Actions */}
        <div className="flex items-center px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer text-textColor">
          <div className="w-6" />
          <span>Turn off Cloud Changes...</span>
        </div>
        <div className="flex items-center px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer text-textColor">
          <div className="w-6" />
          <span>Turn on Remote Tunnel Access...</span>
        </div>

        <div className="h-[1px] bg-border/50 my-1 mx-2" />

        {/* Preferences */}
        <div className="flex items-center px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer text-textColor">
          <div className="w-6" />
          <span>Manage Extension Account Preferences...</span>
        </div>
        <div className="flex items-center px-2 py-1.5 hover:bg-accent hover:text-white cursor-pointer text-textColor">
          <div className="w-6" />
          <span>Manage Language Model Access...</span>
        </div>
      </div>
    </div>
  );
};
