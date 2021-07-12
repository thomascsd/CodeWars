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

            result = Mixing.Mix(" In many languages", " there's a pair of functions");
            Console.WriteLine(result); // 1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt

            result = Mixing.Mix("A generation must confront the looming ", "codewarrs");
            Console.WriteLine(result); // 1:nnnnn/1:ooooo/1:tttt/1:eee/1:gg/1:ii/1:mm/=:rr
        }
    }

    public class Mixing
    {
        private static List<Mixs> m_Results;

        public static string Mix(string s1, string s2)
        {
            m_Results = new List<Mixs>();
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
            CompareDictionary('1', '2', s1, s2);
            CompareDictionary('2', '1', s2, s1);

            var retList = m_Results
                .OrderByDescending(r => r.Count)
                .ThenBy(r => ((short)r.Key))
                .ThenBy(r => r.Word)
                .Select(r => r.Value);

            return string.Join("/", retList);
        }

        private static void CompareDictionary(
            char key1,
            char key2,
            Dictionary<string, List<string>> s1,
            Dictionary<string, List<string>> s2)
        {
            List<string> values;
            char key;

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
                        key = key1;
                        values = values1;
                    }
                    else if (values1.Count == values2.Count)
                    {
                        key = '=';
                        values = values1;
                    }
                    else
                    {
                        key = key2;
                        values = values2;
                    }
                }
                else
                {
                    if (values1.Count == 1)
                    {
                        continue;
                    }

                    key = key1;
                    values = values1;
                }

                string value = key + ":" + string.Join("", values);

                if (!m_Results.Any(m => m.Value == value))
                {
                    m_Results.Add(new Mixs
                    {
                        Key = key,
                        Word = word,
                        Count = values.Count,
                        Value = value
                    });
                }
            }
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