#!/usr/bin/env -S deno run --allow-read=. --allow-write=generated --allow-env=MISE_*
//MISE description="Generate filters for FurAffinity"
import { join as joinPath } from '@std/path'
import { parse } from '@std/toml'

const project_root = Deno.env.get('MISE_PROJECT_ROOT')
if (project_root) {
  const configData = await Deno.readTextFile(
    joinPath(project_root, '.config/filter-settings.toml'),
  )
  const config = parse(configData)
  const users: string[] = config.generators?.lists.furaffinity

  const stream = ReadableStream.from([
    ...users.map((user) => `furaffinity.net##figure.u-${user}\n`),
    ...users.map((user) => `furaffinity.net##figure[data-user="u-${user}"]\n`),
    ...users.map((user) => `||furaffinity.net/*/${user}^$document\n`),
  ])

  await Deno.writeTextFile(
    joinPath(project_root, 'generated/furaffinity.txt'),
    stream,
  )

  console.log('Generated furaffinity user filters')
}
