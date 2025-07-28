import GitHubCalendar from 'react-github-calendar';

const themeFromColorscheme = [ "var(--theme-background)", "var(--theme-accent)"]
const theme = { light: themeFromColorscheme, dark: themeFromColorscheme }

const selectLastHalfYear = (contributions: any[]) => {
  const currentTime = Date.now();
  const showTime = currentTime - 10 * 30 * 24 * 60 * 60 * 1000; // 10 months

  return contributions.filter((activity: any) => {
    const date = new Date(activity.date);
    const unix = date.getTime();

    return unix > showTime;
  });
};

export default function ReactGithubCalendar({username}: {username: string}) {
  return (
    <div className="github-calendar">
      <GitHubCalendar username={username} theme={theme} transformData={selectLastHalfYear} />
    </div>
  );
}