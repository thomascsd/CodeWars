using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace StringsMix
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            string result;

            result = Mixing.Mix("looping is fun but dangerous", "less dangerous than coding");

            Console.WriteLine(result); //1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg
        }
    }

    public class Mixing
    {
        public static string Mix(string s1, string s2)
        {
            var dic1 = CountWords(s1);
            var dic2 = CountWords(s2);
            return CompareWords(dic1, dic2);
        }

        private static Dictionary<string, List<string>> CountWords(string s)
        {
            Regex reg = new Regex("[a-z]");
            var dic = new Dictionary<string, List<string>>();
            List<string> repeats;
            var words = s
                       .Select(s => s.ToString())
                       .Where(s => reg.IsMatch(s))
                       .OrderBy(s => s)
                       .ToList();

            foreach (string word in words)
            {
                if (dic.ContainsKey(word))
                {
                    repeats = dic[word];
                    repeats.Add(word);
                }
                else
                {
                    repeats = new List<string>
                    {
                        word
                    };
                    dic.Add(word, repeats);
                }
            }

            return dic;
        }

        private static string CompareWords(
            Dictionary<string, List<string>> s1,
            Dictionary<string, List<string>> s2)
        {
            var results = new List<Mixs>();

            foreach (string word in s1.Keys)
            {
                var values1 = s1[word];

                if (s2.TryGetValue(word, out List<string> values2))
                {
                    if (values1.Count == 1 && values2.Count == 1)
                    {
                        continue;
                    }

                    if (values1.Count > values2.Count)
                    {
                        results.Add(new Mixs
                        {
                            Key = '1',
                            Word = word,
                            Count = values1.Count,
                            Value = "1:" + string.Join("", values1)
                        });
                    }
                    else if (values1.Count < values2.Count)
                    {
                        results.Add(new Mixs
                        {
                            Key = '2',
                            Word = word,
                            Count = values2.Count,
                            Value = "2:" + string.Join("", values2)
                        });
                    }
                    else
                    {
                        results.Add(new Mixs
                        {
                            Key = '=',
                            Word = word,
                            Count = values1.Count,
                            Value = "=:" + string.Join("", values1)
                        });
                    }
                }
            }

            var values = results
                .OrderByDescending(r => r.Count)
                .ThenBy(r => ((short)r.Key))
                .ThenBy(r => r.Word)
                .Select(r => r.Value);

            return string.Join("/", values);
        }

        private class Mixs
        {
            public char Key { get; set; }

            public string Word { get; set; }

            public int Count { get; set; }

            public string Value { get; set; }
        }
    }
}