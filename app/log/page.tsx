import {LogModel} from "@/models/Log";

export default async function logs(){
    const logs =await LogModel.find().sort({createdAt: -1});

    return (
      <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
          <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
              App's Logs
          </h1>
          <table className="border border-white">
              <thead>
              <tr>
                  <th className="border border-white">Action</th>
                  <th className="border border-white">Message</th>
                  <th className="border border-white">UserId</th>
                  <th className="border border-white">Meta</th>
              </tr>
              </thead>
              <tbody>
              {logs.map((log) => (
                  <tr key={log.id}>
                      <td className="border border-white p-2">
                          {log.action}
                      </td>
                      <td className="border border-white p-2">
                          {log.message}
                      </td>
                      <td className="border border-white p-2">{log.userId}</td>
                      <td className="border border-white p-2">
                          <ul>
                              <li>Method: {log.meta.method}</li>
                              <li>Path: {log.meta.pathname}</li>
                              <li>UA: {log.meta.ua}</li>
                          </ul>
                      </td>
                  </tr>
              ))}
              </tbody>
          </table>
      </div>
    );
}