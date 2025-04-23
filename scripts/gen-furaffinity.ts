import { join as joinPath } from '@std/path'
import { parse } from '@std/toml'

if (import.meta.dirname) {
  const configData = await Deno.readTextFile(
    joinPath(import.meta.dirname, 'settings.toml'),
  )
  const config = parse(configData)
  const users: string[] = config.generators?.lists.furaffinity

  const stream = ReadableStream.from([
    ...users.map((user) => `furaffinity.net##figure.u-${user}\n`),
    ...users.map((user) => `furaffinity.net##figure[data-user="u-${user}"]\n`),
  ])

  await Deno.writeTextFile(
    joinPath(import.meta.dirname, '../generated/furaffinity.txt'),
    stream,
  )

  console.log('Generated furaffinity user filters')
}
