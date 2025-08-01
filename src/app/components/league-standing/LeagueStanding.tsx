import { useEffect, useState } from "react";
import { LeagueStandingInfo } from "../../types/types";
import { useParams } from "react-router-dom";

interface LeagueStandingProps {
  fetchStandings: (leagueId: number) => Promise<LeagueStandingInfo[]>;
}

export default function LeagueStanding({
  fetchStandings,
}: LeagueStandingProps) {
  const [standings, setStandings] = useState<LeagueStandingInfo[]>([]);
  const { leagueId } = useParams<{ leagueId: string }>();

  useEffect(() => {
    if (leagueId) {
      fetchStandings(Number(leagueId)).then((data) => {
        setStandings(data);
      });
    }
  }, [leagueId]);

  return (
    <div className="bg-brand-darkBg text-brand-white p-4 md:p-6 rounded-2xl shadow-xl mt-6 mx-2 md:mx-8">
      <h2 className="text-brand-orange text-lg md:text-2xl font-semibold mb-4">
        League Standings
      </h2>

      {standings.length === 0 ? (
        <p className="bg-brand-danger text-center py-4 rounded-lg">
          No League Info.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-brand-navbar text-brand-lightGray">
                <th className="p-2 text-center">#</th>
                <th className="p-2 text-left">Team</th>
                <th className="p-2 text-center">Pts</th>
                <th className="p-2 text-center">P</th>
                <th className="p-2 text-center">W</th>
                <th className="p-2 text-center">D</th>
                <th className="p-2 text-center">L</th>
                <th className="p-2 text-center">GF</th>
                <th className="p-2 text-center">GA</th>
                <th className="p-2 text-center">Form</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team) => (
                <tr
                  key={team.rank}
                  className="border-b border-brand-card hover:bg-brand-card transition-colors"
                >
                  <td className="text-center py-2">{team.rank}</td>
                  <td className="flex items-center gap-2 py-2">
                    <img
                      src={team.logo}
                      alt={team.teamName}
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                    <span>{team.teamName}</span>
                  </td>
                  <td className="text-center">{team.points}</td>
                  <td className="text-center">{team.played}</td>
                  <td className="text-center">{team.won}</td>
                  <td className="text-center">{team.draw}</td>
                  <td className="text-center">{team.lost}</td>
                  <td className="text-center">{team.goalsFor}</td>
                  <td className="text-center">{team.goalsAgainst}</td>
                  <td className="text-center">{team.form}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
